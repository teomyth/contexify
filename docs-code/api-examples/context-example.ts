import { Context, injectable } from 'contexify';

/**
 * This example demonstrates the basic usage of the Context class.
 */
@injectable()
class GreetingService {
  sayHello(name: string) {
    return `Hello, ${name}!`;
  }
}

@injectable()
class UserService {
  constructor() {}

  getUsers() {
    return ['user1', 'user2', 'user3'];
  }
}

export async function contextExample() {
  // Create a context
  const context = new Context('example');

  // Bind a simple value
  context.bind('greeting').to('Hello, world!');

  // Bind a class
  context.bind('services.GreetingService').toClass(GreetingService);

  // Bind a dynamic value
  context.bind('currentTime').toDynamicValue(() => new Date().toISOString());

  // Resolve values
  const greeting = await context.get<string>('greeting');
  console.log(greeting); // Output: Hello, world!

  const greetingService = await context.get<GreetingService>(
    'services.GreetingService'
  );
  console.log(greetingService.sayHello('John')); // Output: Hello, John!

  const time = await context.get<string>('currentTime');
  console.log(`Current time: ${time}`);

  // Check if a binding exists
  const hasGreeting = context.contains('greeting');
  console.log(`Has greeting binding: ${hasGreeting}`); // Output: true

  // Unbind a value
  context.unbind('greeting');
  const hasGreetingAfterUnbind = context.contains('greeting');
  console.log(`Has greeting binding after unbind: ${hasGreetingAfterUnbind}`); // Output: false

  return {
    greeting,
    greetingServiceResult: greetingService.sayHello('John'),
    time,
    hasGreeting,
    hasGreetingAfterUnbind,
  };
}

// Run the example if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  contextExample().catch(console.error);
}
