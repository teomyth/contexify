import { describe, expect, it } from 'vitest';

import {
  generateUniqueId,
  generateUUID,
  UNIQUE_ID_PATTERN,
  UUID_PATTERN,
} from '../../src/utils/unique-id.js';

describe('unique-id', () => {
  describe('generateUniqueId', () => {
    it('generates a 16-character hexadecimal string', () => {
      const id = generateUniqueId();
      expect(id).toMatch(UNIQUE_ID_PATTERN);
      expect(id.length).toBe(16);
    });

    it('generates unique IDs', () => {
      const ids = new Set();
      for (let i = 0; i < 1000; i++) {
        ids.add(generateUniqueId());
      }
      expect(ids.size).toBe(1000);
    });
  });

  describe('generateUUID', () => {
    it('generates a string in standard UUID format', () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(UUID_PATTERN);
      expect(uuid.length).toBe(36);
    });

    it('follows the UUID format with correct segment lengths', () => {
      const uuid = generateUUID();
      const segments = uuid.split('-');
      expect(segments.length).toBe(5);
      expect(segments[0].length).toBe(8);
      expect(segments[1].length).toBe(4);
      expect(segments[2].length).toBe(4);
      expect(segments[3].length).toBe(4);
      expect(segments[4].length).toBe(12);
    });

    it('generates unique UUIDs', () => {
      const uuids = new Set();
      for (let i = 0; i < 1000; i++) {
        uuids.add(generateUUID());
      }
      expect(uuids.size).toBe(1000);
    });
  });

  describe('UNIQUE_ID_PATTERN', () => {
    it('matches valid unique IDs', () => {
      expect(UNIQUE_ID_PATTERN.test('0123456789abcdef')).toBe(true);
      expect(UNIQUE_ID_PATTERN.test('abcdef0123456789')).toBe(true);
    });

    it('matches substrings in longer strings', () => {
      // The pattern doesn't have ^ and $ anchors, so it matches substrings
      expect(UNIQUE_ID_PATTERN.test('prefix0123456789abcdef')).toBe(true);
      expect(UNIQUE_ID_PATTERN.test('0123456789abcdefsuffix')).toBe(true);
      expect(UNIQUE_ID_PATTERN.test('0123456789abcdefg')).toBe(true); // Matches the first 16 chars
    });

    it("does not match strings that don't contain a valid pattern", () => {
      expect(UNIQUE_ID_PATTERN.test('0123456789abcde')).toBe(false); // Too short
      expect(UNIQUE_ID_PATTERN.test('0123456789abcdeg')).toBe(false); // Invalid character
      expect(UNIQUE_ID_PATTERN.test('ABCDEF0123456789')).toBe(false); // Uppercase not allowed
    });
  });

  describe('UUID_PATTERN', () => {
    it('matches valid UUIDs', () => {
      expect(UUID_PATTERN.test('123e4567-e89b-12d3-a456-426614174000')).toBe(
        true
      );
      expect(UUID_PATTERN.test('00000000-0000-0000-0000-000000000000')).toBe(
        true
      );
      expect(UUID_PATTERN.test('A987FBC9-4BED-3078-CF07-9141BA07C9F3')).toBe(
        true
      ); // Uppercase is allowed
    });

    it('does not match invalid UUIDs', () => {
      expect(UUID_PATTERN.test('123e4567-e89b-12d3-a456-42661417400')).toBe(
        false
      ); // Too short
      expect(UUID_PATTERN.test('123e4567-e89b-12d3-a456-4266141740000')).toBe(
        false
      ); // Too long
      expect(UUID_PATTERN.test('123e4567-e89b-12d3-a456-42661417400g')).toBe(
        false
      ); // Invalid character
      expect(UUID_PATTERN.test('123e4567e89b12d3a45642661417400')).toBe(false); // Missing hyphens
    });
  });
});
