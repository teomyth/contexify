import { describe, expect, it } from 'vitest';
import { run } from './context';

describe('Context Example', () => {
  it('should run without errors', async () => {
    await expect(run()).resolves.not.toThrow();
  });
});
