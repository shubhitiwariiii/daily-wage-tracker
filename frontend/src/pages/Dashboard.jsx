import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Contractor Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome 👋
        </h2>

        <p>
          Daily Wage Tracker Dashboard
        </p>
      </div>
    </div>
  );
}

export default Dashboard;