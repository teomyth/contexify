import { describe, expect, it } from 'vitest';
import { run } from './application';

describe('Application Example', () => {
  it('should run without errors', async () => {
    await expect(run()).resolves.not.toThrow();
  });
});
