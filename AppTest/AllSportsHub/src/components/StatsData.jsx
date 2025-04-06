import { useLocation } from "react-router-dom";

export default function StatsData() {
  const location = useLocation();
  const data = location.state?.data || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">API Data</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
