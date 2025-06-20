import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  //   const { isLoggedIn } = useContext(AppContext);

  if (isLoggedIn) {
    return children;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
