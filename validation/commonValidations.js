import mongoose from "mongoose";
import { body, param } from "express-validator";
import User from "../models/User.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";

export const validateId = (model, idField = "id", userIdField = "user") =>
  param(idField).custom(async (id, { req }) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`Invalid ${model.modelName} id`);
    }
    const document = await model.findById(id);
    if (!document) {
      throw new NotFoundError(`No ${model.modelName} found with id ${id}`);
    }
    if (document[userIdField].toString() !== req.user.userId) {
      throw new UnauthorizedError(
        `Not authorized to access this ${model.modelName}`
      );
    }
    req.document = document;
  });

export const isNonEmptyString = (field) =>
  body(field).isString().notEmpty().withMessage(`${field} is required`);

export const validateUsername = () =>
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new BadRequestError("username already exists");
      }
    });

export const validatePassword = () =>
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long");

export const validateOptionalField = (field, values) =>
  body(field).optional().isIn(values).withMessage(`Invalid ${field}`);
