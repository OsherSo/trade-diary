import { StatusCodes } from "http-status-codes";
import Trade from "../models/Trade.js";
import Diary from "../models/Diary.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

export const createTrade = async (req, res) => {
  const { diaryId } = req.params;
  const requiredFields = [
    "tradeType",
    "symbol",
    "entryDate",
    "entryPrice",
    "quantity",
    "exitDate",
    "exitPrice",
    "stopLoss",
    "takeProfit",
    "fees",
  ];

  if (!requiredFields.every((field) => req.body[field])) {
    throw new BadRequestError("Please provide all required trade information");
  }

  const diary = await Diary.findOne({ _id: diaryId, user: req.user.userId });
  if (!diary) throw new NotFoundError(`No diary with id ${diaryId}`);

  const trade = await Trade.create(req.body);
  diary.trades.push(trade._id);
  await diary.save();

  res.status(StatusCodes.CREATED).json({ trade });
};

export const updateTrade = async (req, res) => {
  const { id: tradeId } = req.params;
  const requiredFields = [
    "tradeType",
    "symbol",
    "entryDate",
    "entryPrice",
    "quantity",
    "exitDate",
    "exitPrice",
    "stopLoss",
    "takeProfit",
    "fees",
  ];

  if (!requiredFields.every((field) => req.body[field])) {
    throw new BadRequestError("Please provide all required trade information");
  }

  const trade = await Trade.findByIdAndUpdate(tradeId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!trade) throw new NotFoundError(`No trade with id ${tradeId}`);

  res.status(StatusCodes.OK).json({ trade });
};

export const deleteTrade = async (req, res) => {
  const { id: tradeId, diaryId } = req.params;

  const trade = await Trade.findByIdAndDelete(tradeId);
  if (!trade) throw new NotFoundError(`No trade with id ${tradeId}`);

  await Diary.findByIdAndUpdate(diaryId, { $pull: { trades: tradeId } });

  res.status(StatusCodes.OK).json({ msg: "Trade deleted successfully" });
};
