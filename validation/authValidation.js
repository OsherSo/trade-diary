import withValidationErrors from "./withValidationErrors.js";
import {
  isNonEmptyString,
  validateUsername,
  validatePassword,
} from "./commonValidations.js";

export const validateRegister = withValidationErrors([
  isNonEmptyString("username"),
  validateUsername(),
  validatePassword(),
]);

export const validateLogin = withValidationErrors([
  isNonEmptyString("username"),
  validatePassword(),
]);
