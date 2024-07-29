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
        {[
          {
            label: "Trade Type",
            id: "tradeType",
            type: "select",
            options: tradeTypeOptions,
          },
          { label: "Symbol", id: "symbol", required: true },
          {
            label: "Entry Date",
            id: "entryDate",
            type: "date",
            required: true,
          },
          {
            label: "Entry Price",
            id: "entryPrice",
            type: "number",
            required: true,
            step: "0.01",
          },
          { label: "Quantity", id: "quantity", type: "number", required: true },
          { label: "Exit Date", id: "exitDate", type: "date" },
          {
            label: "Exit Price",
            id: "exitPrice",
            type: "number",
            step: "0.01",
          },
          {
            label: "Stop Loss",
            id: "stopLoss",
            type: "number",
            required: true,
            step: "0.01",
          },
          {
            label: "Take Profit",
            id: "takeProfit",
            type: "number",
            required: true,
            step: "0.01",
          },
          {
            label: "Fees",
            id: "fees",
            type: "number",
            required: true,
            step: "0.01",
          },
        ].map((field) => (
          <FormField
            key={field.id}
            label={field.label}
            id={field.id}
            name={field.id}
            value={trade[field.id]}
            onChange={onChange}
            type={field.type}
            options={field.options}
            required={field.required}
            step={field.step}
          />
        ))}
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
