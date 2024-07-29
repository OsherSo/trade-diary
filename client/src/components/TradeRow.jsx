import React, { useState } from "react";
import ActionButtons from "./ActionButtons";

const TradeRow = ({ trade, onEditTrade, onDeleteTrade }) => {
  const [showNotes, setShowNotes] = useState(false);

  const formatNumber = (value) =>
    value != null ? Number(value).toFixed(2) : "N/A";
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "N/A";

  return (
    <>
      <tr className="hover:bg-gray-100">
        {[
          "symbol",
          "tradeType",
          "entryDate",
          "entryPrice",
          "quantity",
          "exitDate",
          "exitPrice",
          "stopLoss",
          "takeProfit",
          "fees",
          "profitLoss",
        ].map((field, index) => (
          <td key={index} className="border p-2">
            {field === "entryPrice" ||
            field === "exitPrice" ||
            field === "stopLoss" ||
            field === "takeProfit" ||
            field === "fees" ||
            field === "profitLoss"
              ? `$${formatNumber(trade[field])}`
              : field === "entryDate" || field === "exitDate"
              ? formatDate(trade[field])
              : trade[field] || "N/A"}
          </td>
        ))}
        <td className="border p-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-blue-500 underline"
          >
            {showNotes ? "Hide Notes" : "Show Notes"}
          </button>
        </td>
        <td className="border p-2">
          <ActionButtons
            onEdit={() => onEditTrade(trade)}
            onDelete={() => onDeleteTrade(trade._id)}
          />
        </td>
      </tr>
      {showNotes && (
        <tr>
          <td colSpan="13" className="border p-2 bg-gray-50">
            <strong>Notes:</strong> {trade.notes || "No notes available"}
          </td>
        </tr>
      )}
    </>
  );
};

export default TradeRow;
