import React from "react";
import FormField from "./FormField";

const TradeForm = ({ trade, onSubmit, onChange, isEditing }) => {
  const tradeTypeOptions = [
    { value: "long", label: "Long" },
    { value: "short", label: "Short" },
  ];

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Trade Type"
          id="tradeType"
          name="tradeType"
          value={trade.tradeType}
          onChange={onChange}
          type="select"
          options={tradeTypeOptions}
        />
        <FormField
          label="Symbol"
          id="symbol"
          name="symbol"
          value={trade.symbol}
          onChange={onChange}
          required
        />
        <FormField
          label="Entry Date"
          id="entryDate"
          name="entryDate"
          value={trade.entryDate}
          onChange={onChange}
          type="date"
          required
        />
        <FormField
          label="Entry Price"
          id="entryPrice"
          name="entryPrice"
          value={trade.entryPrice}
          onChange={onChange}
          type="number"
          required
          step="0.01"
        />
        <FormField
          label="Quantity"
          id="quantity"
          name="quantity"
          value={trade.quantity}
          onChange={onChange}
          type="number"
          required
        />
        <FormField
          label="Exit Date"
          id="exitDate"
          name="exitDate"
          value={trade.exitDate}
          onChange={onChange}
          type="date"
        />
        <FormField
          label="Exit Price"
          id="exitPrice"
          name="exitPrice"
          value={trade.exitPrice}
          onChange={onChange}
          type="number"
          step="0.01"
        />
        <FormField
          label="Stop Loss"
          id="stopLoss"
          name="stopLoss"
          value={trade.stopLoss}
          onChange={onChange}
          type="number"
          required
          step="0.01"
        />
        <FormField
          label="Take Profit"
          id="takeProfit"
          name="takeProfit"
          value={trade.takeProfit}
          onChange={onChange}
          type="number"
          required
          step="0.01"
        />
        <FormField
          label="Fees"
          id="fees"
          name="fees"
          value={trade.fees}
          onChange={onChange}
          type="number"
          required
          step="0.01"
        />
      </div>

      <FormField
        label="Notes"
        id="notes"
        name="notes"
        value={trade.notes}
        onChange={onChange}
        type="textarea"
      />

      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isEditing ? "Update Trade" : "Add Trade"}
      </button>
    </form>
  );
};

export default TradeForm;
