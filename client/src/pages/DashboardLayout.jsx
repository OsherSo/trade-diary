import { createContext, useState, useContext } from "react";
import { Outlet, useLoaderData, useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

import Navbar from "../components/Navbar";
import DiaryList from "../components/DiaryList";

export const loader = async () => {
  try {
    const [userResponse, diariesResponse] = await Promise.all([
      customFetch.get("/users/current-user"),
      customFetch.get("/diaries"),
    ]);
    return { user: userResponse.data, diaries: diariesResponse.data };
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user, diaries } = useLoaderData();
  const navigate = useNavigate();

  const logout = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logged out successfully");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        logout,
      }}
    >
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
              <DiaryList diaries={diaries.diaries} />
              <Outlet context={{ user }} />
            </div>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
