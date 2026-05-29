import { Navigate } from "react-router-dom";

function WorkerProtectedRoute({
  children,
}) {
  const worker =
    localStorage.getItem("worker");

  if (!worker) {
    return (
      <Navigate to="/worker-login" />
    );
  }

  return children;
}

export default WorkerProtectedRoute;