import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Data() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch("/api/get-data")
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result) && result.length > 0) {
          setColumns(Object.keys(result[0]));
          setData(result);
        } else {
          setData([]);
          setColumns([]);
        }
      })
      .catch((err) => {
        console.error("Data loading error:", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Results from Database
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">
          Oops! No data to show!
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="border border-gray-300 px-6 py-3 text-left font-semibold uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-gray-150" : "bg-white"
                  } hover:bg-blue-100 transition-colors`}
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="border border-gray-300 px-6 py-3 text-gray-700"
                    >
                      {String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Button to navigate to the second page */}
      <div className="mt-6 text-center">
        <Link
          to="/main/stats"
          className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          Go to Stats Page
        </Link>
      </div>
    </div>
  );
}
