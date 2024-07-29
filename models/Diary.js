import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    trades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trade",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

diarySchema.virtual("totalProfitLoss").get(function () {
  return this.trades.reduce(
    (total, trade) => total + (trade.profitLoss || 0),
    0
  );
});

export default mongoose.model("Diary", diarySchema);
