import { Router } from "express";
import {
  createTrade,
  updateTrade,
  deleteTrade,
} from "../controllers/tradeController.js";

const router = Router({ mergeParams: true });

router.route("/").post(createTrade);
router.route("/:id").patch(updateTrade).delete(deleteTrade);

export default router;
