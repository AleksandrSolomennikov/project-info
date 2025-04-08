import { useEffect, useState } from 'react';

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/get-data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Данные</h2>
      <ul className="list-disc pl-6">
        {data.map((item, index) => (
          <li key={index}>{item.id}: {item.name}</li>
        ))}
      </ul>
    </div>
  );
}
