import { BindingScope, Context, injectable, Provider } from 'contexify';

/**
 * This example demonstrates the various binding methods available in Contexify.
 */
@injectable()
class GreetingService {
  sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}

@injectable()
class TimeProvider implements Provider<string> {
  value() {
    return new Date().toISOString();
  }
}

export async function bindingExample() {
  // Create a context
  const context = new Context('example');

  // 1. Bind to a simple value
  context.bind('simpleValue').to('This is a simple value');

  // 2. Bind to a class
  context.bind('services.GreetingService').toClass(GreetingService);

  // 3. Bind to a dynamic value
  context.bind('dynamicValue').toDynamicValue(() => Math.random());

  // 4. Bind to a provider
  context.bind('currentTime').toProvider(TimeProvider);

  // 5. Bind to an alias
  context.bind('config.apiUrl').to('https://api.example.com');
  context.bind('apiUrl').toAlias('config.apiUrl');

  // 6. Binding with different scopes
  context.bind('singleton').to(new Date()).inScope(BindingScope.SINGLETON);
  context
    .bind('transient')
    .toDynamicValue(() => new Date())
    .inScope(BindingScope.TRANSIENT);
  context
    .bind('contextScoped')
    .toDynamicValue(() => new Date())
    .inScope(BindingScope.CONTEXT);

  // 7. Binding with tags
  context
    .bind('service.user')
    .toClass(GreetingService)
    .tag('service')
    .tag('core');
  context
    .bind('service.time')
    .toProvider(TimeProvider)
    .tag('service')
    .tag('utility');

  // Resolve and test the bindings
  const simpleValue = await context.get<string>('simpleValue');
  console.log(`Simple value: ${simpleValue}`);

  const greetingService = await context.get<GreetingService>(
    'services.GreetingService'
  );
  console.log(`Greeting service: ${greetingService.sayHello('World')}`);

  const dynamicValue1 = await context.get<number>('dynamicValue');
  const dynamicValue2 = await context.get<number>('dynamicValue');
  console.log(`Dynamic values: ${dynamicValue1}, ${dynamicValue2}`);
  console.log(`Values are different: ${dynamicValue1 !== dynamicValue2}`);

  const currentTime = await context.get<string>('currentTime');
  console.log(`Current time: ${currentTime}`);

  const apiUrl = await context.get<string>('apiUrl');
  console.log(`API URL (via alias): ${apiUrl}`);

  // Test scopes
  const singleton1 = await context.get('singleton');
  const singleton2 = await context.get('singleton');
  console.log(`Singleton instances are the same: ${singleton1 === singleton2}`);

  const transient1 = await context.get('transient');
  const transient2 = await context.get('transient');
  console.log(
    `Transient instances are different: ${transient1 !== transient2}`
  );

  // Find bindings by tag
  const serviceBindings = await context.findByTag('service');
  console.log(`Found ${serviceBindings.length} service bindings`);

  return {
    simpleValue,
    greetingServiceResult: greetingService.sayHello('World'),
    dynamicValuesAreDifferent: dynamicValue1 !== dynamicValue2,
    currentTime,
    apiUrl,
    singletonInstancesAreSame: singleton1 === singleton2,
    transientInstancesAreDifferent: transient1 !== transient2,
    serviceBindingsCount: serviceBindings.length,
  };
}

// Run the example if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  bindingExample().catch(console.error);
}
