import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DiaryProvider } from "./context/DiaryContext";

import {
  Landing,
  Error,
  Login,
  Register,
  DashboardLayout,
  DiaryDetailPage,
  CreateDiaryPage,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as diaryDetailLoader } from "./pages/DiaryDetailPage";

import { authCheckLoader } from "./utils/authUtils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: authCheckLoader,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    loader: authCheckLoader,
    action: registerAction,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: dashboardLoader,
    children: [
      {
        path: "diary/:id",
        element: <DiaryDetailPage />,
        loader: diaryDetailLoader,
      },
      {
        path: "create-diary",
        element: <CreateDiaryPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <DiaryProvider>
      <RouterProvider router={router} />
    </DiaryProvider>
  );
}

export default App;
