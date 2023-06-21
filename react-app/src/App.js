import Dashboard from './Dashboard/Dashboard';
import { Routes, Route, Switch, BrowserRouter } from "react-router-dom";
import MainContent from './Dashboard/MainContent';
import Employees from '../src/Employees/Employees'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<MainContent />}>
            <Route path="employees" element={<Employees />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}