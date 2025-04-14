
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {Provider} from '../../src/index.js';

describe('Provider', () => {
  let provider: Provider<string>;

  beforeEach(givenProvider);

  describe('value()', () => {
    it('returns the value of the binding', () => {
      expect(provider.value()).toBe('hello world');
    });
  });

  function givenProvider() {
    provider = new MyProvider('hello');
  }
});

class MyProvider implements Provider<string> {
  constructor(private _msg: string) {}
  value(): string {
    return this._msg + ' world';
  }
}
