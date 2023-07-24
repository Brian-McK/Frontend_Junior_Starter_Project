import { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const [fromLocalJwt, setFromLocalJwt] = useState(
    localStorage.getItem("token")
  );
  const [fromLocalUsername, setFromLocalUsername] = useState(
    localStorage.getItem("username")
  );

  const refreshTokenAsync = async () => {
    try {
      const refreshResult = await fetch(
        "https://localhost:7100/api/Auth/refresh-token",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromLocalUsername),
        }
      );
      const data = await refreshResult.json();

      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (fromLocalJwt) {
        return;
      }

      await refreshTokenAsync().then((res) => {
        setFromLocalJwt(res.jwtToken);
        setFromLocalUsername(res.username);
      });
    };

    fetchData();
  }, []);

  return fromLocalJwt ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
