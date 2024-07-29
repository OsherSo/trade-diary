import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDiaryContext } from "../context/DiaryContext";

const DiaryList = () => {
  const { diaries, fetchDiaries, deleteDiary } = useDiaryContext();

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this diary?")) {
      await deleteDiary(id);
    }
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diaries.map((diary) => (
          <div key={diary._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {diary.name}
            </h2>
            <p className="text-gray-600 mt-2">
              Created: {new Date(diary.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Trades: {diary.trades.length}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/dashboard/diary/${diary._id}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View Diary
              </Link>
              <button
                onClick={() => handleDelete(diary._id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          to="/dashboard/create-diary"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Create New Diary
        </Link>
      </div>
    </div>
  );
};

export default DiaryList;
