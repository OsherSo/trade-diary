const DiaryStats = ({ totalTrades, totalProfitLoss, winRate }) => {
  const formatNumber = (value) => {
    return value != null ? Number(value).toFixed(2) : "N/A";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="border p-4 rounded">
        <h2 className="font-bold">Total Trades</h2>
        <p className="text-2xl font-semibold">{totalTrades}</p>
      </div>
      <div className="border p-4 rounded">
        <h2 className="font-bold">Total Profit/Loss</h2>
        <p
          className={`text-2xl font-semibold ${
            totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${formatNumber(totalProfitLoss)}
        </p>
      </div>
      <div className="border p-4 rounded">
        <h2 className="font-bold">Win Rate</h2>
        <p className="text-2xl font-semibold">{winRate}%</p>
      </div>
    </div>
  );
};

export default DiaryStats;
