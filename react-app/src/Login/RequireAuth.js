import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();

  const fromLocal = localStorage.getItem("token");
  
  return fromLocal ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
