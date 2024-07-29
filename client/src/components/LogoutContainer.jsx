import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useDashboardContext();

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setShowLogout(!showLogout)}
      >
        <span>{user?.user.username}</span>
        <FaCaretDown className="text-gray-400" />
      </button>
      {showLogout && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              type="button"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutContainer;
