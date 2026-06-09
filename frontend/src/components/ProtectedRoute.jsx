import { Navigate } from "react-router-dom";

// Protects contractor routes by checking for an auth token in localStorage.
// If missing, redirects to the login page.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;