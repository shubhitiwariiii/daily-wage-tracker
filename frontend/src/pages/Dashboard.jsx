import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] =
    useState("");
  const [dailyWage, setDailyWage] =
    useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/workers",
        {
          name,
          phone,
          dailyWage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Worker Added");

      setName("");
      setPhone("");
      setDailyWage("");
    } catch (error) {
      alert("Failed to add worker");
    }
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

      <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Add Worker
        </h2>

        <form onSubmit={handleAddWorker}>
          <input
            type="text"
            placeholder="Worker Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Daily Wage"
            value={dailyWage}
            onChange={(e) =>
              setDailyWage(e.target.value)
            }
            className="w-full border p-3 rounded mb-4"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            Add Worker
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;