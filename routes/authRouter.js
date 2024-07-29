import { Router } from "express";

import { register, login, logout } from "../controllers/authController.js";

import {
  validateRegister,
  validateLogin,
} from "../validation/authValidation.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
