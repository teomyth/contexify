/**
 * Type definition for JSON types
 */

/**
 * JSON primitive types:
 * - string
 * - number
 * - boolean
 * - null
 */
export type JSONPrimitive = string | number | boolean | null;

/**
 * JSON values
 * - primitive
 * - object
 * - array
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

/**
 * JSON object
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JSONObject extends Record<string, JSONValue> {}

/**
 * JSON array
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JSONArray extends Array<JSONValue> {}
