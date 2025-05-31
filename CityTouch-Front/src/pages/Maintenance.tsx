import { Link } from "react-router-dom";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-8 text-center text-white">
      <h1 className="text-7xl mb-6 animate-pulse">🚧</h1>
      <h2 className="text-4xl font-extrabold mb-4 tracking-wide">
        This function is under maintenance
      </h2>
      <p className="max-w-xl text-lg text-purple-200 mb-8">
        We're currently working to improve this feature. Please check back
        later. Thank you for your patience.
      </p>

      <Link
        to="/"
        className="inline-block bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 transition rounded-lg px-8 py-3 font-semibold shadow-lg"
      >
        Return Home
      </Link>
    </div>
  );
};

export default Maintenance;
