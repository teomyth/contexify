import { createBindingFromClass, Binding } from 'contexify';
import { UserController } from '../controllers/user-controller.js';
import { ApiBindings } from '../keys.js';

/**
 * This is the API component for the modular application example.
 * It provides controllers for the application's API.
 */

export class ApiComponent {
  bindings = [
    // Bind the component itself
    Binding.create(ApiBindings.COMPONENT)
      .to(this)
      .tag('component'),

    // Bind the user controller
    createBindingFromClass(UserController, {
      key: ApiBindings.CONTROLLER,
    }).tag('controller'),
  ];
}
