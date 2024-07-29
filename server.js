import "express-async-errors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import tradeRouter from "./routes/tradeRouter.js";
import diaryRouter from "./routes/diaryRouter.js";

import errorHandler from "./middleware/errorHandler.js";
import { authenticateUser } from "./middleware/auth.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/diaries", authenticateUser, diaryRouter);

app.use(
  "/api/v1/diaries/:diaryId/trades",
  authenticateUser,
  (req, res, next) => {
    req.diaryId = req.params.diaryId;
    console.log(req.diaryId);
    next();
  },
  tradeRouter
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    error: "Page not found",
  });
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
