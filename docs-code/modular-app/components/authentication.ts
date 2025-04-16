import { createBindingFromClass, Binding } from 'contexify';
import { DefaultAuthService } from '../services/auth-service.js';
import { DefaultAuthProvider } from '../providers/auth-provider.js';
import { AuthBindings } from '../keys.js';

/**
 * This is the authentication component for the modular application example.
 * It provides authentication services for the application.
 */

export class AuthComponent {
  bindings = [
    // Bind the component itself
    Binding.create(AuthBindings.COMPONENT)
      .to(this)
      .tag('component'),
    
    // Bind the auth service
    createBindingFromClass(DefaultAuthService, {
      key: AuthBindings.SERVICE,
    }).tag('service'),
    
    // Bind the auth provider
    createBindingFromClass(DefaultAuthProvider, {
      key: AuthBindings.PROVIDER,
    }).tag('provider'),
  ];
}
