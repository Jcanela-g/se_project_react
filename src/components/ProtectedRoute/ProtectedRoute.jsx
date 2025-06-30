import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();

  if (isLoggedIn) {
    return children;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
