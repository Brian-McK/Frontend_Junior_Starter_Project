import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentToken, selectCurrentUser } from "../Redux/Services/authSlice";

const RequireAuth = () => {
  const location = useLocation();

  const token = useSelector(selectCurrentToken);

  const fromLocal = localStorage.getItem("token");
  
  return fromLocal ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
