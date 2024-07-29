import { StatusCodes } from "http-status-codes";

import Diary from "../models/Diary.js";

export const createDiary = async (req, res) => {
  req.body.user = req.user.userId;
  const diary = await Diary.create(req.body);
  res.status(StatusCodes.CREATED).json({ diary });
};

export const getAllDiaries = async (req, res) => {
  const diaries = await Diary.find({ user: req.user.userId }).sort(
    "-createdAt"
  );
  res.status(StatusCodes.OK).json({ diaries, count: diaries.length });
};

export const getDiary = async (req, res) => {
  const diary = await req.document.populate("trades");
  res.status(StatusCodes.OK).json({ diary });
};

export const updateDiary = async (req, res) => {
  const diary = await Diary.findByIdAndUpdate(req.document._id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ diary });
};

export const deleteDiary = async (req, res) => {
  await req.document.remove();
  res.status(StatusCodes.OK).json({ msg: "Diary deleted successfully" });
};
