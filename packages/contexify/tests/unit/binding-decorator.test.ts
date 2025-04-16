import { describe, it, expect, beforeEach } from 'vitest';

import {
  bind,
  injectable,
  BindingScope,
  Context,
  Provider,
  createBindingFromClass,
  getBindingMetadata,
  asBindingTemplate,
} from '../../src/index.js';

describe('binding-decorator', () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = new Context('test-context');
  });

  describe('@injectable', () => {
    it('decorates a class with binding metadata', () => {
      @injectable()
      class TestClass {}

      const metadata = getBindingMetadata(TestClass);
      expect(metadata).toBeDefined();
      expect(metadata?.target).toBe(TestClass);
      expect(metadata?.templates).toHaveLength(1);
    });

    it('accepts binding scope and tags', () => {
      @injectable({
        scope: BindingScope.SINGLETON,
        tags: ['service', { name: 'test-service' }],
      })
      class TestService {}

      const binding = createBindingFromClass(TestService);
      expect(binding.scope).toBe(BindingScope.SINGLETON);
      expect(binding.tagMap).toMatchObject({
        service: 'service',
        name: 'test-service',
      });
    });

    it('accepts multiple binding templates', () => {
      const template1 = (binding: any) => binding.tag('template1');
      const template2 = (binding: any) => binding.tag('template2');

      @injectable(template1, template2)
      class TestClass {}

      const binding = createBindingFromClass(TestClass);
      expect(binding.tagMap).toMatchObject({
        template1: 'template1',
        template2: 'template2',
      });
    });

    it('inherits binding metadata from base class', () => {
      @injectable({
        scope: BindingScope.SINGLETON,
        tags: ['base'],
      })
      class BaseClass {}

      @injectable({
        tags: ['derived'],
      })
      class DerivedClass extends BaseClass {}

      const binding = createBindingFromClass(DerivedClass);
      expect(binding.scope).toBe(BindingScope.SINGLETON);
      expect(binding.tagMap).toMatchObject({
        base: 'base',
        derived: 'derived',
      });
    });

    it('overrides binding scope from base class', () => {
      @injectable({
        scope: BindingScope.SINGLETON,
      })
      class BaseClass {}

      @injectable({
        scope: BindingScope.TRANSIENT,
      })
      class DerivedClass extends BaseClass {}

      const binding = createBindingFromClass(DerivedClass);
      expect(binding.scope).toBe(BindingScope.TRANSIENT);
    });
  });

  describe('@injectable.provider', () => {
    it('decorates a provider class', () => {
      @injectable.provider()
      class TestProvider implements Provider<string> {
        value() {
          return 'test';
        }
      }

      const binding = createBindingFromClass(TestProvider);
      expect(binding.source?.type).toBe('Provider');
      expect(binding.source?.value).toBe(TestProvider);
    });

    it('accepts binding scope and tags', () => {
      @injectable.provider({
        scope: BindingScope.SINGLETON,
        tags: ['provider', { name: 'test-provider' }],
      })
      class TestProvider implements Provider<string> {
        value() {
          return 'test';
        }
      }

      const binding = createBindingFromClass(TestProvider);
      expect(binding.scope).toBe(BindingScope.SINGLETON);
      expect(binding.tagMap).toMatchObject({
        provider: 'provider',
        name: 'test-provider',
      });
    });

    it('throws error if target is not a Provider', () => {
      expect(() => {
        @injectable.provider()
        class NotAProvider {}
      }).toThrow(/is not a Provider/);
    });
  });

  describe('@bind', () => {
    it('is an alias for @injectable', () => {
      @bind({
        scope: BindingScope.SINGLETON,
        tags: ['service'],
      })
      class TestService {}

      const binding = createBindingFromClass(TestService);
      expect(binding.scope).toBe(BindingScope.SINGLETON);
      expect(binding.tagMap).toMatchObject({
        service: 'service',
      });
    });

    it('bind.provider is an alias for injectable.provider', () => {
      @bind.provider({
        tags: ['provider'],
      })
      class TestProvider implements Provider<string> {
        value() {
          return 'test';
        }
      }

      const binding = createBindingFromClass(TestProvider);
      expect(binding.source?.type).toBe('Provider');
      expect(binding.tagMap).toMatchObject({
        provider: 'provider',
      });
    });
  });

  describe('asBindingTemplate', () => {
    it('converts binding scope and tags to a template function', () => {
      const template = asBindingTemplate({
        scope: BindingScope.SINGLETON,
        tags: ['test'],
      });

      const binding = ctx.bind('test');
      template(binding);

      expect(binding.scope).toBe(BindingScope.SINGLETON);
      expect(binding.tagMap).toMatchObject({
        test: 'test',
      });
    });

    it('handles array of tags', () => {
      const template = asBindingTemplate({
        tags: ['tag1', 'tag2', { name: 'test' }],
      });

      const binding = ctx.bind('test');
      template(binding);

      expect(binding.tagMap).toMatchObject({
        tag1: 'tag1',
        tag2: 'tag2',
        name: 'test',
      });
    });

    it('handles only scope without tags', () => {
      const template = asBindingTemplate({
        scope: BindingScope.CONTEXT,
      });

      const binding = ctx.bind('test');
      template(binding);

      expect(binding.scope).toBe(BindingScope.CONTEXT);
    });

    it('handles only tags without scope', () => {
      const template = asBindingTemplate({
        tags: 'single-tag',
      });

      const binding = ctx.bind('test');
      template(binding);

      expect(binding.tagMap).toMatchObject({
        'single-tag': 'single-tag',
      });
    });
  });

  describe('integration with Context', () => {
    it('binds a decorated class to the context', () => {
      @injectable({
        scope: BindingScope.SINGLETON,
        tags: ['service'],
      })
      class TestService {}

      ctx.add(createBindingFromClass(TestService));

      const binding = ctx.getBinding('classes.TestService');
      expect(binding).toBeDefined();
      expect(binding.scope).toBe(BindingScope.SINGLETON);
      expect(binding.tagMap).toMatchObject({
        service: 'service',
      });

      const services = ctx.findByTag('service');
      expect(services).toHaveLength(1);
      expect(services[0].key).toBe('classes.TestService');
    });

    it('resolves a decorated provider class', async () => {
      @injectable.provider({
        tags: ['provider'],
      })
      class TestProvider implements Provider<string> {
        value() {
          return 'hello world';
        }
      }

      ctx.add(createBindingFromClass(TestProvider));

      const result = await ctx.get('providers.TestProvider');
      expect(result).toBe('hello world');
    });

    it('supports dynamic value provider classes', async () => {
      class TestDynamicProvider {
        static value() {
          return 'dynamic value';
        }
      }

      @injectable({
        tags: ['dynamic'],
      })
      class TestClass {}

      const binding = createBindingFromClass(TestDynamicProvider);
      expect(binding.source?.type).toBe('DynamicValue');

      ctx.add(binding);
      const result = await ctx.get(binding.key);
      expect(result).toBe('dynamic value');
    });
  });
});
