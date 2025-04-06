import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatsForm from "./StatsForm";
import StatsData from "./StatsData"; // Создадим этот компонент

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main/stats" element={<StatsForm />} />
        <Route path="/main/stats/data" element={<StatsData />} />
      </Routes>
    </Router>
  );
}

export default App;
