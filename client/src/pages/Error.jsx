import { useNavigate } from "react-router-dom";

import img from "../assets/images/not-found.jpg";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-12 text-center">
        <div className="space-y-6">
          <div className="w-96 h-96 mx-auto bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-xl">
            <img src={img} alt="Not Found" />
          </div>

          <h1 className="mt-8 text-6xl font-extrabold text-gray-900">404</h1>

          <h2 className="mt-2 text-4xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <button
            onClick={() => navigate("/")}
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Go Back Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-xl font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Go Back to Previous Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
