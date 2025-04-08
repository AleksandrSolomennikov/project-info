import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Добро пожаловать</h1>
      <Link to="/main/stats" className="text-blue-500 underline mt-4 block">
        Перейти к созданию запроса
      </Link>
    </div>
  );
}
