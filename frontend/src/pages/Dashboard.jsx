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
  const [searchQuery, setSearchQuery] = useState("");
  const [editingWorker, setEditingWorker] = useState(null);

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

  // Edit worker
  const handleEditWorker = async (id) => {
    try {
      const token = localStorage.getItem("token");

      // Simple prompt-based edit - can be replaced with modal UI
      const newName = prompt("Worker name:");
      if (newName === null) return; // cancel
      const newPhone = prompt("Phone number:", "");
      if (newPhone === null) return;
      const newDailyWage = prompt("Daily wage:", "");
      if (newDailyWage === null) return;

      await axios.put(
        `http://localhost:5000/api/workers/${id}`,
        { name: newName, phone: newPhone, dailyWage: Number(newDailyWage) },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      fetchWorkers();
      alert("Worker updated");
    } catch (error) {
      console.log(error);
      alert("Failed to update worker");
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

      alert(error.response?.data?.message || "Failed to mark attendance");
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

  const today = new Date().toLocaleDateString();

  const totalPresent = attendance.filter(
    (item) =>
      item.workerId &&
      item.status === "Present" &&
      new Date(item.date).toLocaleDateString() === today,
  ).length;

  const totalAbsent = attendance.filter(
    (item) =>
      item.workerId &&
      item.status === "Absent" &&
      new Date(item.date).toLocaleDateString() === today,
  ).length;

  const currentMonth = new Date().getMonth();

  const currentYear = new Date().getFullYear();

  const totalWages = attendance
    .filter((item) => {
      if (!item.workerId || item.status !== "Present" || !item.date) {
        return false;
      }

      const attendanceDate = new Date(item.date);

      return (
        attendanceDate.getMonth() === currentMonth &&
        attendanceDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, item) => sum + item.wageForDay, 0);

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-black">
          Contractor Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-3 md:px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-sm font-medium text-gray-600">Total Workers</h2>
          <p className="text-2xl md:text-3xl mt-1 font-bold">
            {workers.length}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-sm font-medium text-gray-600">Present</h2>
          <p className="text-2xl md:text-3xl mt-1 font-bold text-green-600">
            {totalPresent}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-sm font-medium text-gray-600">Absent</h2>
          <p className="text-2xl md:text-3xl mt-1 font-bold text-yellow-600">
            {totalAbsent}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-sm font-medium text-gray-600">
            Total Earnings Recorded
          </h2>
          <p className="text-2xl md:text-3xl mt-1 font-bold">₹{totalWages}</p>
        </div>
      </div>

      {/* Add Worker Form */}
      <div className="mt-8 bg-gray-50 p-4 md:p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Add Worker</h2>

        <form onSubmit={handleAddWorker}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search worker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4 bg-white"
            />
          </div>
          <input
            type="text"
            placeholder="Worker Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4 bg-white"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4 bg-white"
          />

          <input
            type="number"
            placeholder="Daily Wage"
            value={dailyWage}
            onChange={(e) => setDailyWage(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4 bg-white"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            {editingWorker ? "Update Worker" : "Add Worker"}
          </button>
        </form>
      </div>

      {/* attendance history */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Attendance History
        </h2>

        <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-4 text-left">Worker</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Wage</th>

                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {attendance
                  .filter((item) => item.workerId)
                  .map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="p-4">{item.workerId?.name}</td>

                      <td className="p-4">
                        <span
                          className={
                            item.status === "Present"
                              ? "text-green-600 font-bold"
                              : "text-yellow-600 font-bold"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4">₹{item.wageForDay}</td>

                      <td className="p-4">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Workers List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Workers List</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workers.length === 0 ? (
            <div className="bg-gray-50 p-6 rounded-xl shadow-md">
              <p className="mt-2 text-gray-700">
                No workers found. Add your first worker above.
              </p>
            </div>
          ) : (
            workers
              .filter((w) =>
                w.name?.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((worker) => (
                <div
                  key={worker._id}
                  className="bg-gray-50 p-6 rounded-xl text-black shadow-md hover:shadow-xl transition duration-300 w-full"
                >
                  <h3 className="text-2xl font-bold mb-2">{worker.name}</h3>
                  <p className="text-lg mt-2">Phone: {worker.phone}</p>
                  <p className="text-lg">Daily Wage: ₹{worker.dailyWage}</p>

                  <div className="flex gap-3 mt-4 flex-wrap">
                    <button
                      onClick={() => handleEditWorker(worker._id)}
                      className="bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteWorker(worker._id)}
                      className="bg-red-500 text-white px-3 md:px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleAttendance(worker._id, "Present")}
                      className="bg-green-500 text-white px-3 md:px-4 py-2 rounded-lg"
                    >
                      Present
                    </button>

                    <button
                      onClick={() => handleAttendance(worker._id, "Absent")}
                      className="bg-yellow-500 text-black px-3 md:px-4 py-2 rounded-lg"
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
