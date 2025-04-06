import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sportsOptions = ["Formula 1", "Football", "Basketball"];
const dataOptions = ["Seasons", "Teams", "Players", "Competitions"];

export default function StatsForm() {
  const [sport, setSport] = useState("");
  const [dataType, setDataType] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/fetch-data?sport=${sport}&dataType=${dataType}&query=${query}`);
        const result = await response.json();
        
        console.log("Fetched Data:", result);
        navigate(`/main/stats/data`, { state: { data: result.data } });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Enter API Query</h2>
        
        <label className="block mb-2">Sport Type:</label>
        <select value={sport} onChange={(e) => setSport(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="">Select sport</option>
          {sportsOptions.map((sport) => (
            <option key={sport} value={sport.toLowerCase()}>{sport}</option>
          ))}
        </select>
        
        <label className="block mb-2">Data Type:</label>
        <select value={dataType} onChange={(e) => setDataType(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="">Select data type</option>
          {dataOptions.map((data) => (
            <option key={data} value={data.toLowerCase()}>{data}</option>
          ))}
        </select>
        
        <label className="block mb-2">Query (team, player, etc.):</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter specific name"
        />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          GO
        </button>
      </form>
    </div>
  );
}
