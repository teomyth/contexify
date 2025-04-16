import { describe, it, expect } from 'vitest';

import { BindingKey } from '../../src/index.js';
import { UNIQUE_ID_PATTERN } from '../../src/utils/unique-id.js';

describe('BindingKey', () => {
  describe('create', () => {
    it('creates a key with a binding key only', () => {
      expect(BindingKey.create('foo')).toEqual({
        key: 'foo',
        propertyPath: undefined,
      });
    });

    it('creates a key with a binding key and a property path', () => {
      expect(BindingKey.create('foo', 'port')).toEqual({
        key: 'foo',
        propertyPath: 'port',
      });
    });

    it('creates a key with a property path parsed from the key arg', () => {
      const keyString = BindingKey.create('foo', 'port').toString();
      expect(BindingKey.create(keyString)).toEqual({
        key: 'foo',
        propertyPath: 'port',
      });
    });

    it('rejects a key with an encoded path when the path arg is provided', () => {
      expect(() => BindingKey.create('foo#port', 'port')).toThrow(
        /Binding key.*cannot contain/
      );
    });
  });

  describe('buildKeyWithPath', () => {
    it('composes address parts using correct separator', () => {
      expect(BindingKey.create('foo', 'bar').toString()).toBe('foo#bar');
    });
  });

  describe('parseKeyWithPath', () => {
    it('parses key without path', () => {
      expect(BindingKey.parseKeyWithPath('foo')).toEqual({
        key: 'foo',
        propertyPath: undefined,
      });
    });

    it('parses key with path', () => {
      expect(BindingKey.parseKeyWithPath('foo#bar')).toEqual({
        key: 'foo',
        propertyPath: 'bar',
      });
    });
  });

  describe('generate', () => {
    it('generates binding key without namespace', () => {
      const key1 = BindingKey.generate().key;
      expect(key1).toMatch(new RegExp(`^${UNIQUE_ID_PATTERN.source}$`));
      const key2 = BindingKey.generate().key;
      expect(key1).not.toEqual(key2);
    });

    it('generates binding key with namespace', () => {
      const key1 = BindingKey.generate('services').key;
      expect(key1).toMatch(
        new RegExp(`^services\\.${UNIQUE_ID_PATTERN.source}$`, 'i')
      );
      const key2 = BindingKey.generate('services').key;
      expect(key1).not.toEqual(key2);
    });
  });
});
