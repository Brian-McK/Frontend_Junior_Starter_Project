import Dashboard from './Dashboard/Dashboard';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainContent from './Dashboard/MainContent';
import ManageEmployees from './Employees/ManageEmployees';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<MainContent />}>
            <Route path="employees" element={<ManageEmployees />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}