import { describe, expect, it } from 'vitest';
import { bindingExample } from '../api-examples/binding-example.js';
import { contextExample } from '../api-examples/context-example.js';
import { contextViewExample } from '../api-examples/context-view-example.js';
import { decoratorExample } from '../api-examples/decorator-example.js';

describe('API Examples', () => {
  describe('Context Example', () => {
    it('should demonstrate basic context operations', async () => {
      const result = await contextExample();

      expect(result.greeting).toBe('Hello, world!');
      expect(result.greetingServiceResult).toBe('Hello, John!');
      expect(result.time).toBeDefined();
      expect(result.hasGreeting).toBe(true);
      expect(result.hasGreetingAfterUnbind).toBe(false);
    });
  });

  describe('Binding Example', () => {
    it('should demonstrate various binding methods', async () => {
      const result = await bindingExample();

      expect(result.simpleValue).toBe('This is a simple value');
      expect(result.greetingServiceResult).toBe('Hello, World!');
      expect(result.dynamicValuesAreDifferent).toBe(true);
      expect(result.currentTime).toBeDefined();
      expect(result.apiUrl).toBe('https://api.example.com');
      expect(result.singletonInstancesAreSame).toBe(true);
      expect(result.transientInstancesAreDifferent).toBe(true);
      expect(result.serviceBindingsCount).toBe(2);
    });
  });

  describe('Decorator Example', () => {
    it('should demonstrate decorator usage', async () => {
      const result = await decoratorExample();

      expect(result.users).toEqual(['user:user1', 'user:user2', 'user:user3']);
    });
  });

  describe('ContextView Example', () => {
    it('should demonstrate context view usage', async () => {
      const result = await contextViewExample();

      expect(result.initializedPlugins).toHaveLength(3);
      expect(result.initializedPlugins).toContain('logging');
      expect(result.initializedPlugins).toContain('auth');
      expect(result.initializedPlugins).toContain('cache');
    });
  });
});
