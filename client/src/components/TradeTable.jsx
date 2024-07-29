import TableHeader from "./TableHeader";
import TradeRow from "./TradeRow";

const TradeTable = ({ trades, onEditTrade, onDeleteTrade }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Recent Trades</h2>
      <table className="w-full border-collapse border">
        <TableHeader />
        <tbody>
          {trades.map((trade) => (
            <TradeRow
              key={trade._id}
              trade={trade}
              onEditTrade={onEditTrade}
              onDeleteTrade={onDeleteTrade}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeTable;
