import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function WorkerDashboard() {
  const worker = JSON.parse(localStorage.getItem("worker"));
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem("worker");

    navigate("/worker-login");
  };

  const fetchAttendance = async () => {
    try {
      const worker = JSON.parse(localStorage.getItem("worker"));

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://daily-wage-tracker-ima6.onrender.com/api/attendance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const workerAttendance = res.data.filter(
        (item) => item.workerId?._id === worker._id,
      );

      setAttendance(workerAttendance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const presentDays = attendance.filter(
    (item) => item.status === "Present",
  ).length;

  const absentDays = attendance.filter(
    (item) => item.status === "Absent",
  ).length;

  const totalEarned = attendance
    .filter((item) => item.status === "Present")
    .reduce((sum, item) => sum + item.wageForDay, 0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl text-black font-bold">
            Worker Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-3 md:px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl text-black font-semibold">{worker.name}</h2>

          <p className="mt-2 text-black">Phone: {worker.phone}</p>

          <p className="mt-2 text-black">Daily Wage: ₹{worker.dailyWage}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl text-black font-bold">Present Days</h2>

            <p className="text-2xl md:text-3xl mt-2 text-green-600">
              {presentDays}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl text-black font-bold">Absent Days</h2>

            <p className="text-2xl md:text-3xl mt-2 text-yellow-600">
              {absentDays}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl text-black font-bold">Total Earned</h2>

            <p className="text-2xl md:text-3xl text-black mt-2">
              ₹{totalEarned}
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl text-black font-bold mb-4">
              Attendance History
            </h2>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Wage</th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendance.length > 0 ? (
                      attendance.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="p-4">
                            {new Date(item.date).toLocaleDateString()}
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                item.status === "Present"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>

                          <td className="p-4 font-medium">
                            ₹{item.wageForDay}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-6 text-gray-500"
                        >
                          No attendance records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
