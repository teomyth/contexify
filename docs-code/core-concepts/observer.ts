import { Context, ContextObserver, Binding } from 'contexify';

/**
 * This example demonstrates how to use observers in Contexify.
 * Observers allow you to react to changes in the Context.
 */

// Define a service registry observer
class ServiceRegistry implements ContextObserver {
  // Only interested in bindings with 'service' tag
  filter = (binding: Readonly<Binding<unknown>>) => binding.tagMap.service != null;

  observe(event: string, binding: Readonly<Binding<unknown>>, context: Context) {
    if (event === 'bind') {
      console.log(`Service registered: ${binding.key}`);
      // You could perform additional actions here, like registering with a discovery service
    } else if (event === 'unbind') {
      console.log(`Service unregistered: ${binding.key}`);
      // You could perform cleanup actions here
    }
  }
}

// Define a configuration observer
class ConfigObserver implements ContextObserver {
  // Only interested in bindings with keys starting with 'config.'
  filter = (binding: Readonly<Binding<unknown>>) => binding.key.startsWith('config.');

  observe(event: string, binding: Readonly<Binding<unknown>>, context: Context) {
    if (event === 'bind') {
      console.log(`Configuration added: ${binding.key}`);
    } else if (event === 'unbind') {
      console.log(`Configuration removed: ${binding.key}`);
    }
  }
}

async function run() {
  // Create a context
  const context = new Context('application');
  
  // Register observers
  context.subscribe(new ServiceRegistry());
  context.subscribe(new ConfigObserver());
  
  // Add bindings
  console.log('\n--- Adding bindings ---');
  context.bind('services.UserService')
    .to({ name: 'UserService' })
    .tag('service');
  
  context.bind('services.OrderService')
    .to({ name: 'OrderService' })
    .tag('service');
  
  context.bind('config.api')
    .to({ port: 3000, host: 'localhost' });
  
  // Remove bindings
  console.log('\n--- Removing bindings ---');
  context.unbind('services.OrderService');
  context.unbind('config.api');
  
  // Create a view that tracks all bindings with 'service' tag
  console.log('\n--- Using context view ---');
  const servicesView = context.createView(
    binding => binding.tagMap.service != null
  );
  
  // Get all services
  const services = await servicesView.values();
  console.log('Services:', services);
  
  // Add another service
  context.bind('services.PaymentService')
    .to({ name: 'PaymentService' })
    .tag('service');
  
  // Get all services again
  const updatedServices = await servicesView.values();
  console.log('Updated services:', updatedServices);
}

// Export the run function for testing
export { run };

// If running directly
if (typeof require !== 'undefined' && require.main === module) {
  run().catch(err => console.error(err));
}
