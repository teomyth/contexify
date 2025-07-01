import { Context } from 'contexify';
import { describe, expect, it } from 'vitest';

describe('Basic Context Test', () => {
  it('should create a context', () => {
    const context = new Context('test');
    expect(context).toBeDefined();
    expect(context.name).toBe('test');
  });

  it('should bind and resolve a value', async () => {
    const context = new Context('test');
    context.bind('test.value').to('test-value');

    const value = await context.get<string>('test.value');
    expect(value).toBe('test-value');
  });
});
