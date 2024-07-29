import React, { useState } from "react";
import ActionButtons from "./ActionButtons";

const TradeRow = ({ trade, onEditTrade, onDeleteTrade }) => {
  const [showNotes, setShowNotes] = useState(false);

  const formatNumber = (value) => {
    return value != null ? Number(value).toFixed(2) : "N/A";
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "N/A";
  };

  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="border p-2">{trade.symbol}</td>
        <td className="border p-2">{trade.tradeType}</td>
        <td className="border p-2">{formatDate(trade.entryDate)}</td>
        <td className="border p-2">${formatNumber(trade.entryPrice)}</td>
        <td className="border p-2">{trade.quantity || "N/A"}</td>
        <td className="border p-2">{formatDate(trade.exitDate) || "Open"}</td>
        <td className="border p-2">${formatNumber(trade.exitPrice)}</td>
        <td className="border p-2">${formatNumber(trade.stopLoss)}</td>
        <td className="border p-2">${formatNumber(trade.takeProfit)}</td>
        <td className="border p-2">${formatNumber(trade.fees)}</td>
        <td
          className={`border p-2 ${
            (trade.profitLoss || 0) >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${formatNumber(trade.profitLoss)}
        </td>
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
