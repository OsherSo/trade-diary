import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  DiaryHeader,
  DiaryStats,
  ProfitLossChart,
  TradeForm,
  TradeTable,
} from "../components";

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`/api/v1/diaries/${params.id}`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch diary");
  }
};

const DiaryDetailPage = () => {
  const { diary } = useLoaderData();
  const [isActive, setIsActive] = useState(diary.isActive);
  const [error, setError] = useState(null);
  const [showAddTrade, setShowAddTrade] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);
  const [newTrade, setNewTrade] = useState({
    tradeType: "long",
    symbol: "",
    entryDate: "",
    entryPrice: "",
    quantity: "",
    exitDate: "",
    exitPrice: "",
    stopLoss: "",
    takeProfit: "",
    fees: "",
    notes: "",
  });
  const navigate = useNavigate();

  const handleIsActiveToggle = async () => {
    try {
      const { data } = await axios.patch(`/api/v1/diaries/${diary._id}`, {
        isActive: !isActive,
      });
      setIsActive(data.diary.isActive);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddTrade = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/v1/diaries/${diary._id}/trades`, newTrade);
      setShowAddTrade(false);
      navigate(`/dashboard/diary/${diary._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditTrade = (trade) => {
    setEditingTrade(trade);
    setNewTrade({
      ...trade,
      entryDate: trade.entryDate.split("T")[0],
      exitDate: trade.exitDate ? trade.exitDate.split("T")[0] : "",
    });
    setShowAddTrade(true);
  };

  const handleUpdateTrade = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `/api/v1/diaries/${diary._id}/trades/${editingTrade._id}`,
        newTrade
      );
      setShowAddTrade(false);
      setEditingTrade(null);
      navigate(`/dashboard/diary/${diary._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTrade = async (tradeId) => {
    if (window.confirm("Are you sure you want to delete this trade?")) {
      try {
        await axios.delete(`/api/v1/diaries/${diary._id}/trades/${tradeId}`);
        navigate(`/dashboard/diary/${diary._id}`);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrade((prev) => ({ ...prev, [name]: value }));
  };

  const profitLossData = diary.trades.map((trade) => ({
    date: new Date(trade.exitDate || trade.entryDate).toLocaleDateString(),
    profitLoss: trade.profitLoss || 0,
  }));

  const winRate =
    diary.trades.length > 0
      ? (
          (diary.trades.filter((trade) => (trade.profitLoss || 0) > 0).length /
            diary.trades.length) *
          100
        ).toFixed(2)
      : "0.00";

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <DiaryHeader
        name={diary.name}
        description={diary.description}
        isActive={isActive}
        onToggleActive={handleIsActiveToggle}
      />

      <DiaryStats
        totalTrades={diary.trades.length}
        totalProfitLoss={diary.totalProfitLoss}
        winRate={winRate}
      />

      <ProfitLossChart data={profitLossData} />

      <TradeTable
        trades={diary.trades}
        onEditTrade={handleEditTrade}
        onDeleteTrade={handleDeleteTrade}
      />

      <div className="mb-8">
        <button
          onClick={() => {
            setShowAddTrade(!showAddTrade);
            setEditingTrade(null);
            setNewTrade({
              tradeType: "long",
              symbol: "",
              entryDate: "",
              entryPrice: "",
              quantity: "",
              exitDate: "",
              exitPrice: "",
              stopLoss: "",
              takeProfit: "",
              fees: "",
              notes: "",
            });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showAddTrade ? "Cancel" : "Add New Trade"}
        </button>

        {showAddTrade && (
          <TradeForm
            trade={newTrade}
            onSubmit={editingTrade ? handleUpdateTrade : handleAddTrade}
            onChange={handleInputChange}
            isEditing={!!editingTrade}
          />
        )}
      </div>

      <div className="flex space-x-4">
        <Link
          to="/dashboard"
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default DiaryDetailPage;
