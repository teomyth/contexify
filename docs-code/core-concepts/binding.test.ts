import { describe, expect, it } from 'vitest';
import { run } from './binding';

describe('Binding Example', () => {
  it('should run without errors', async () => {
    await expect(run()).resolves.not.toThrow();
  });
});
