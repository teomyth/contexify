import { injectable, inject } from 'contexify';
import { AuthBindings } from '../keys.js';
import { AuthService } from '../services/auth-service.js';
import { User, ApiResponse } from '../types.js';

/**
 * This is the user controller for the modular application example.
 * It provides API endpoints for user-related operations.
 */

@injectable()
export class UserController {
  constructor(@inject(AuthBindings.SERVICE) private authService: AuthService) {}
  
  async login(username: string, password: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.authService.authenticate(username, password);
      
      if (!user) {
        return {
          success: false,
          error: 'Invalid username or password',
        };
      }
      
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred during login',
      };
    }
  }
  
  async verifyToken(token: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.authService.verifyToken(token);
      
      if (!user) {
        return {
          success: false,
          error: 'Invalid token',
        };
      }
      
      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred during token verification',
      };
    }
  }
}
