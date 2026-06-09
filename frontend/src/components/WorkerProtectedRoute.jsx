import { Navigate } from "react-router-dom";

// Protects worker routes by ensuring a `worker` object is present in localStorage.
// This keeps worker and contractor auth flows separate.
function WorkerProtectedRoute({ children }) {
  const worker = localStorage.getItem("worker");

  if (!worker) {
    return <Navigate to="/worker-login" />;
  }

  return children;
}

export default WorkerProtectedRoute;