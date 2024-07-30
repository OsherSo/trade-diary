import { body } from "express-validator";
import Diary from "../models/Diary.js";
import { validateId } from "./commonValidations.js";
import withValidationErrors from "./withValidationErrors.js";

export const validateCreateDiary = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Diary name is required")
    .isString()
    .withMessage("Diary name must be a string")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Diary name must be between 3 and 50 characters"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
]);

export const validateDiaryId = withValidationErrors([validateId(Diary)]);

export const validateUpdateDiary = withValidationErrors([
  ...validateCreateDiary,
  validateId(Diary),
]);
