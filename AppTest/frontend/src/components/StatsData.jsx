import { useLocation, useNavigate } from "react-router-dom";

export default function StatsData() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">No data available. Please go back and try again.</p>
        <button
          onClick={() => navigate("/main/stats")}
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Fetched Data</h2>
      <pre className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-2xl overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        onClick={() => navigate("/main/stats")}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Back to Form
      </button>
    </div>
  );
}
