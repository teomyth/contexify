import { describe, it, expect } from 'vitest';
import { run } from './dependency-injection';

describe('Dependency Injection Example', () => {
  it('should run without errors', async () => {
    await expect(run()).resolves.not.toThrow();
  });
});
