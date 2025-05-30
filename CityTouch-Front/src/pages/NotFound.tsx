import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-8 text-center text-white">
      <h1 className="text-8xl font-extrabold mb-6 animate-pulse">404</h1>
      <h2 className="text-4xl font-semibold mb-4 tracking-wide">
        Page Not Found
      </h2>
      <p className="max-w-lg text-lg text-purple-300 mb-8">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-block bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 transition rounded-lg px-8 py-3 font-semibold shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
