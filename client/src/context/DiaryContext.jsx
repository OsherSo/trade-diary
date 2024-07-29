import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [diaries, setDiaries] = useState([]);

  const fetchDiaries = useCallback(async () => {
    try {
      const response = await axios.get("/api/v1/diaries");
      setDiaries(response.data.diaries);
    } catch (error) {
      console.error("Error fetching diaries:", error);
    }
  }, []);

  const addDiary = useCallback((newDiary) => {
    setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
  }, []);

  const deleteDiary = useCallback(async (diaryId) => {
    try {
      await axios.delete(`/api/v1/diaries/${diaryId}`);
      setDiaries((prevDiaries) =>
        prevDiaries.filter((diary) => diary._id !== diaryId)
      );
    } catch (error) {
      console.error("Error deleting diary:", error);
    }
  }, []);

  return (
    <DiaryContext.Provider
      value={{ diaries, fetchDiaries, addDiary, deleteDiary }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiaryContext = () => useContext(DiaryContext);
