import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6">
        Welcome to All Sports Hub
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Not quite all sports, but we’ve got something interesting for you.
      </p>
      <Link
        to="/main/stats"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Explore Now
      </Link>
    </div>
  );
}