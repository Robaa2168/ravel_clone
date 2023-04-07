import { useEffect } from "react";
import { useUser } from "./context";
import { isTokenValid } from "./jwtHelper";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userContext = useUser();
  const navigate = useNavigate();
  const { user } = userContext;

  useEffect(() => {
    if (!user || !isTokenValid(user.token)) {
      navigate("/login");
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;
