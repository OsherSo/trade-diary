import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    tradeType: {
      type: String,
      enum: ["long", "short"],
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    entryDate: {
      type: Date,
      required: true,
    },
    entryPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    exitDate: {
      type: Date,
      required: true,
    },
    exitPrice: {
      type: Number,
      required: true,
    },
    stopLoss: {
      type: Number,
      required: true,
    },
    takeProfit: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    profitLoss: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

tradeSchema.pre("save", function (next) {
  if (this.exitPrice && this.entryPrice && this.quantity) {
    this.profitLoss =
      this.tradeType === "long"
        ? (this.exitPrice - this.entryPrice) * this.quantity - this.fees
        : (this.entryPrice - this.exitPrice) * this.quantity - this.fees;
  }
  next();
});

export default mongoose.model("Trade", tradeSchema);
