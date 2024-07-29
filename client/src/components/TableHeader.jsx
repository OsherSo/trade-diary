const TableHeader = () => (
  <thead>
    <tr className="bg-gray-200">
      {[
        "Symbol",
        "Type",
        "Entry Date",
        "Entry Price",
        "Quantity",
        "Exit Date",
        "Exit Price",
        "Stop Loss",
        "Take Profit",
        "Fees",
        "Profit/Loss",
        "Notes",
        "Actions",
      ].map((header) => (
        <th key={header} className="border p-2">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
