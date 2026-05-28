import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dailyWage, setDailyWage] = useState("");
  const [workers, setWorkers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Fetch workers
  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/workers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWorkers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete workers
  const handleDeleteWorker = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/workers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchWorkers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendance = async (workerId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/attendance",
        {
          workerId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(`Attendance marked ${status}`);
      fetchAttendance();
    } catch (error) {
      console.log(error);

      alert("Failed to mark attendance");
    }
  };

  // Load workers on page load
  useEffect(() => {
    fetchWorkers();
    fetchAttendance();
  }, []);

  // Add worker
  const handleAddWorker = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

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
        },
      );

      alert("Worker Added");

      // Refresh workers list
      fetchWorkers();

      // Clear form
      setName("");
      setPhone("");
      setDailyWage("");
    } catch (error) {
      console.log(error);

      alert("Failed to add worker");
    }
  };

  const totalPresent = attendance.filter(
    (item) => item.status === "Present",
  ).length;

  const totalAbsent = attendance.filter(
    (item) => item.status === "Absent",
  ).length;

  const totalWages = attendance.reduce((sum, item) => sum + item.wageForDay, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contractor Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold">Total Workers</h2>

          <p className="text-3xl mt-2">{workers.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold">Present</h2>

          <p className="text-3xl mt-2 text-green-600">{totalPresent}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold">Absent</h2>

          <p className="text-3xl mt-2 text-yellow-600">{totalAbsent}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold">Total Wages</h2>

          <p className="text-3xl mt-2">₹{totalWages}</p>
        </div>
      </div>

      {/* Add Worker Form */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Worker</h2>

        <form onSubmit={handleAddWorker}>
          <input
            type="text"
            placeholder="Worker Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Daily Wage"
            value={dailyWage}
            onChange={(e) => setDailyWage(e.target.value)}
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

      {/* Workers List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Workers List</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workers.map((worker) => (
            <div key={worker._id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold">{worker.name}</h3>
              <p className="text-lg mt-2">Phone: {worker.phone}</p>
              <p className="text-lg">Daily Wage: ₹{worker.dailyWage}</p>

              <div className="flex gap-3 mt-4 flex-wrap">
                <button
                  onClick={() => handleDeleteWorker(worker._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleAttendance(worker._id, "Present")}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Present
                </button>

                <button
                  onClick={() => handleAttendance(worker._id, "Absent")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
