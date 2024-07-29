const ActionButtons = ({ onEdit, onDelete }) => (
  <div>
    <button
      onClick={onEdit}
      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
    >
      Edit
    </button>
    <button
      onClick={onDelete}
      className="bg-red-500 text-white px-2 py-1 rounded"
    >
      Delete
    </button>
  </div>
);

export default ActionButtons;
