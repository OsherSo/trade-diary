import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDiaryContext } from "../context/DiaryContext";

const CreateDiaryPage = () => {
  const [diaryData, setDiaryData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addDiary } = useDiaryContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiaryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/diaries", diaryData);
      addDiary(response.data.diary);
      navigate(`/dashboard/diary/${response.data.diary._id}`);
    } catch (err) {
      setError(
        err.response?.data?.msg || "An error occurred while creating the diary"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Diary</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Diary Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={diaryData.name}
            onChange={handleChange}
            required
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={diaryData.description}
            onChange={handleChange}
            rows="4"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Diary
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDiaryPage;
