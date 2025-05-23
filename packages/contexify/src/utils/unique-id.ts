/**
 * Create a function that generates unique identifiers in an extremely fast way.
 * This produces a hexadecimal format string (e.g. '52032fedb951da00').
 *
 * @param size - The length of the ID to generate (default: 16)
 * @returns A function that generates unique IDs
 * @internal
 */
export function createIdGenerator(size = 16) {
  const alphabet = '0123456789abcdef';
  return () => {
    let str = '';
    const num = (Math.random() * 16) | 0;
    for (let i = 0; i < size; i++) {
      str += alphabet[i === 0 ? num : (Math.random() * 16) | 0];
    }
    return str;
  };
}

/**
 * Generate a unique identifier in an extremely fast way.
 * This produces a hexadecimal format string (e.g. '52032fedb951da00').
 *
 * @internal
 */
export const generateUniqueId = createIdGenerator();

/**
 * Generate a UUID-like identifier.
 * This produces a standard UUID format string (e.g. '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d').
 *
 * @internal
 */
export function generateUUID(): string {
  const h = createIdGenerator(32)();
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

/**
 * A regular expression for testing values generated by generateUniqueId.
 * @internal
 */
export const UNIQUE_ID_PATTERN = /[0-9a-f]{16}/;

/**
 * A regular expression for testing standard UUID format.
 * @internal
 */
export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
