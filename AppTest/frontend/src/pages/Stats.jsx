import { useState } from 'react';

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Creating request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={field1} onChange={e => setField1(e.target.value)} className="border p-2 w-full">
          <option value="">Sports</option>
          <option value="formula 1">Formula 1</option>
          <option value="football">Football</option>
          <option value="basketball">Basketball</option>
        </select>

        <select value={field2} onChange={e => setField2(e.target.value)} className="border p-2 w-full">
          <option value="">Data type</option>
          <option value="players">Players</option>
          <option value="teams">Teams</option>
          <option value="competitions">Competitions</option>
          <option value="seasons">Seasons</option>
        </select>

        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Input text"
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Let's go
        </button>
      </form>

      {response && (
        <div className="mt-4 text-green-600">
          Server response: {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
}
