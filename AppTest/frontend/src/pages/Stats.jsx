import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Stats() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      field1,
      field2,
      inputText,
    };

    try {
      const res = await fetch('/api/create-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setResponse(result);
    } catch (err) {
      console.error('Request sending error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        What do you want to explore?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <select
          value={field1}
          onChange={(e) => setField1(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a sport</option>
          <option value="formula 1">Formula 1</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
        </select>

        <select
          value={field2}
          onChange={(e) => setField2(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select data type</option>
          <option value="players">Players</option>
          <option value="teams">Teams</option>
          <option value="competitions">Competitions</option>
          <option value="seasons">Seasons</option>
        </select>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter details"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      <Link
        to="/main/stats/data"
        className="px-6 py-3 bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 text-center mt-4"
      >
        Move
      </Link>

      {response && (
        <div className="mt-6 text-center text-green-600">
          Server response: {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
}