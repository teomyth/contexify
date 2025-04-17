import { injectable } from 'contexify';
import { User } from '../types.js';

/**
 * This is the authentication provider for the modular application example.
 * It provides the actual implementation for authenticating users and verifying tokens.
 */

@injectable()
export class DefaultAuthProvider {
  authenticate(username: string, password: string): Promise<User | null> {
    // In a real application, this would check against a database
    if (username === 'admin' && password === 'password') {
      return Promise.resolve({
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
      });
    }
    return Promise.resolve(null);
  }

  verifyToken(token: string): Promise<User | null> {
    // In a real application, this would verify a JWT token
    if (token === 'valid-token') {
      return Promise.resolve({
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
      });
    }
    return Promise.resolve(null);
  }
}
