import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Stats from './pages/Stats';
import Data from './pages/Data';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/main/stats" element={<Stats />} />
        <Route path="/main/stats/data" element={<Data />} />
      </Routes>
    </Router>
  );
  
}