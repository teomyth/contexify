import { inject, injectable } from 'contexify';
import { AuthBindings } from '../keys.js';
import { User } from '../types.js';

/**
 * This is the authentication service for the modular application example.
 * It provides methods for authenticating users and verifying tokens.
 */

export interface AuthService {
  authenticate(username: string, password: string): Promise<User | null>;
  verifyToken(token: string): Promise<User | null>;
}

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(@inject(AuthBindings.PROVIDER) private authProvider: any) {}

  async authenticate(username: string, password: string): Promise<User | null> {
    // Authentication logic
    return this.authProvider.authenticate(username, password);
  }

  async verifyToken(token: string): Promise<User | null> {
    // Token verification logic
    return this.authProvider.verifyToken(token);
  }
}
