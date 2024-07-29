import { StatusCodes } from "http-status-codes";
import Trade from "../models/Trade.js";
import Diary from "../models/Diary.js";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

export const createTrade = async (req, res) => {
  const { diaryId } = req.params;
  const {
    tradeType,
    symbol,
    entryDate,
    entryPrice,
    quantity,
    exitDate,
    exitPrice,
    stopLoss,
    takeProfit,
    fees,
    notes,
  } = req.body;

  // Check for all required fields
  if (
    !tradeType ||
    !symbol ||
    !entryDate ||
    !entryPrice ||
    !quantity ||
    !exitDate ||
    !exitPrice ||
    !stopLoss ||
    !takeProfit ||
    !fees
  ) {
    throw new BadRequestError("Please provide all required trade information");
  }

  const diary = await Diary.findOne({ _id: diaryId, user: req.user.userId });
  if (!diary) {
    throw new NotFoundError(`No diary with id ${diaryId}`);
  }

  const trade = await Trade.create({
    tradeType,
    symbol,
    entryDate,
    entryPrice,
    quantity,
    exitDate,
    exitPrice,
    stopLoss,
    takeProfit,
    fees,
    notes,
  });

  diary.trades.push(trade._id);
  await diary.save();

  res.status(StatusCodes.CREATED).json({ trade });
};

export const updateTrade = async (req, res) => {
  const { id: tradeId } = req.params;
  const {
    tradeType,
    symbol,
    entryDate,
    entryPrice,
    quantity,
    exitDate,
    exitPrice,
    stopLoss,
    takeProfit,
    fees,
    notes,
  } = req.body;

  // Check for all required fields
  if (
    !tradeType ||
    !symbol ||
    !entryDate ||
    !entryPrice ||
    !quantity ||
    !exitDate ||
    !exitPrice ||
    !stopLoss ||
    !takeProfit ||
    !fees
  ) {
    throw new BadRequestError("Please provide all required trade information");
  }

  const trade = await Trade.findById(tradeId);

  if (!trade) {
    throw new NotFoundError(`No trade with id ${tradeId}`);
  }

  // Update trade fields
  trade.tradeType = tradeType;
  trade.symbol = symbol;
  trade.entryDate = entryDate;
  trade.entryPrice = entryPrice;
  trade.quantity = quantity;
  trade.exitDate = exitDate;
  trade.exitPrice = exitPrice;
  trade.stopLoss = stopLoss;
  trade.takeProfit = takeProfit;
  trade.fees = fees;
  trade.notes = notes;

  // Save the updated trade
  await trade.save();

  res.status(StatusCodes.OK).json({ trade });
};

export const deleteTrade = async (req, res) => {
  const { id: tradeId, diaryId } = req.params;

  const trade = await Trade.findByIdAndDelete(tradeId);
  if (!trade) {
    throw new NotFoundError(`No trade with id ${tradeId}`);
  }

  await Diary.findByIdAndUpdate(diaryId, { $pull: { trades: tradeId } });

  res.status(StatusCodes.OK).json({ msg: "Trade deleted successfully" });
};
