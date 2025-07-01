import {
  Context,
  Interceptor,
  InvocationContext,
  ValueOrPromise,
  injectable,
  intercept,
} from 'contexify';

/**
 * This example demonstrates how to use interceptors in Contexify.
 * Interceptors allow you to add cross-cutting concerns to your methods.
 */

// Define a logging interceptor
class LogInterceptor implements Interceptor {
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ) {
    // Code executed before the method call
    const { methodName, args } = invocationCtx;
    console.log(`Calling ${methodName} with args:`, args);

    const start = Date.now();
    try {
      // Call the next interceptor or the method itself
      const result = await next();

      // Code executed after the method call
      const duration = Date.now() - start;
      console.log(
        `${methodName} completed in ${duration}ms with result:`,
        result
      );

      // Return the result
      return result;
    } catch (error) {
      // Code executed if the method throws an error
      const duration = Date.now() - start;
      console.error(
        `${methodName} failed after ${duration}ms with error:`,
        error
      );
      throw error;
    }
  }
}

// Define a caching interceptor
class CacheInterceptor implements Interceptor {
  private cache = new Map<string, any>();

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<any>
  ) {
    const { methodName, args } = invocationCtx;
    const cacheKey = `${methodName}:${JSON.stringify(args)}`;

    // Check if result is in cache
    if (this.cache.has(cacheKey)) {
      console.log(`Cache hit for ${cacheKey}`);
      return this.cache.get(cacheKey);
    }

    // Call the method
    const result = await next();

    // Cache the result
    this.cache.set(cacheKey, result);
    console.log(`Cached result for ${cacheKey}`);

    return result;
  }
}

// Define a service with intercepted methods
@injectable()
class UserService {
  // Method-level interceptor
  @intercept(LogInterceptor)
  async createUser(userData: { name: string }) {
    console.log('Creating user...');
    // Simulate database operation
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { id: Date.now().toString(), ...userData };
  }

  // Multiple interceptors
  @intercept(LogInterceptor, CacheInterceptor)
  async getUserById(id: string) {
    console.log(`Fetching user with ID ${id}...`);
    // Simulate database operation
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { id, name: 'John Doe' };
  }
}

// Define a service with class-level interceptor
@injectable()
@intercept(LogInterceptor)
class ProductService {
  async getProducts() {
    console.log('Fetching products...');
    // Simulate database operation
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [
      { id: '1', name: 'Product 1' },
      { id: '2', name: 'Product 2' },
    ];
  }

  async getProductById(id: string) {
    console.log(`Fetching product with ID ${id}...`);
    // Simulate database operation
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { id, name: `Product ${id}` };
  }
}

async function run() {
  // Create a context
  const context = new Context('application');

  // Bind services
  context.bind('services.UserService').toClass(UserService);
  context.bind('services.ProductService').toClass(ProductService);

  // Get services
  const userService = await context.get<UserService>('services.UserService');
  const productService = await context.get<ProductService>(
    'services.ProductService'
  );

  // Use services
  console.log('\n--- Testing method-level interceptor ---');
  const user = await userService.createUser({ name: 'John Doe' });
  console.log('Created user:', user);

  console.log('\n--- Testing multiple interceptors ---');
  const user1 = await userService.getUserById('1');
  console.log('User 1:', user1);

  // Test cache
  console.log('\n--- Testing cache ---');
  const user1Again = await userService.getUserById('1');
  console.log('User 1 (from cache):', user1Again);

  console.log('\n--- Testing class-level interceptor ---');
  const products = await productService.getProducts();
  console.log('Products:', products);

  const product1 = await productService.getProductById('1');
  console.log('Product 1:', product1);
}

// Export the run function for testing
export { run };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  run().catch((err) => console.error(err));
}
