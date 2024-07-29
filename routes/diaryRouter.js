import express from "express";

import {
  createDiary,
  getAllDiaries,
  getDiary,
  updateDiary,
  deleteDiary,
} from "../controllers/diaryContorller.js";

import {
  validateCreateDiary,
  validateUpdateDiary,
  validateDiaryId,
} from "../validation/diaryValidation.js";

const router = express.Router();

router.route("/").post(validateCreateDiary, createDiary).get(getAllDiaries);

router
  .route("/:id")
  .get(validateDiaryId, getDiary)
  .patch(validateUpdateDiary, updateDiary)
  .delete(validateDiaryId, deleteDiary);

export default router;
