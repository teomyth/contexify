/**
 * This file contains the type definitions for the modular application example.
 */

// User interface
export interface User {
  id: string;
  username: string;
  email: string;
}

// API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
