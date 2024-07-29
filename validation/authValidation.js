import withValidationErrors from "./withValidationErrors.js";
import {
  isNonEmptyString,
  validateUsername,
  validatePassword,
} from "./commonValidations.js";

const validateRegister = withValidationErrors([
  isNonEmptyString("username"),
  validateUsername(),
  validatePassword(),
]);

const validateLogin = withValidationErrors([
  isNonEmptyString("username"),
  validatePassword(),
]);

export { validateRegister, validateLogin };
