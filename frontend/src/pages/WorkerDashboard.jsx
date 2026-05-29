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
      const res = await axios.get("http://localhost:5000/api/attendance");

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

  const totalPresent = attendance.filter(
    (item) => item.status === "Present",
  ).length;

  const totalAbsent = attendance.filter(
    (item) => item.status === "Absent",
  ).length;

  const totalWages = attendance.reduce((sum, item) => sum + item.wageForDay, 0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl text-black font-bold">Worker Dashboard</h1>

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

            <p className="text-2xl md:text-3xl mt-2 text-green-600">{totalPresent}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl text-black font-bold">Absent Days</h2>

            <p className="text-2xl md:text-3xl mt-2 text-yellow-600">{totalAbsent}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-xl text-black font-bold">Total Earned</h2>

            <p className="text-2xl md:text-3xl text-black mt-2">₹{totalWages}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl text-black font-bold mb-4">Attendance History</h2>

            <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-4 text-left">Status</th>

                    <th className="p-4 text-left">Wage</th>

                    <th className="p-4 text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {attendance.map((item) => (
                    <tr key={item._id} className="border-b">
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
        </div>
      </div>
    </div>
  );
}

export default WorkerDashboard;
