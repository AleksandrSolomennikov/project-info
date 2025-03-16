import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchList from "./components/MatchList";
import Loader from "./components/loader";

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/matches");
        setMatches(response.data.matches || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch match data");
        setLoading(false);
        console.error("Error:", err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-3xl font-bold">Match Results</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-6">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <MatchList matches={matches} />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 Match Results App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
