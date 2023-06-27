import Dashboard from "./Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import ManageEmployees from "./Employees/ManageEmployees";
import Login from "./Login/Login";
import RequireAuth from "./Login/RequireAuth";
import Layout from "../src/Common/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<Layout />}>
            <Route path="employees" element={<ManageEmployees />} />
          </Route>
        </Route>
      </Route>
      {/* protected routes */}
    </Routes>
  );
}
