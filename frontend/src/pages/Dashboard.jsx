import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

  // Edit worker: populate form for updating
  const handleEditWorker = (workerId) => {
    const worker = workers.find((w) => w._id === workerId);
    if (!worker) return;

    setEditingWorker(worker);
    setName(worker.name || "");
    setPhone(worker.phone || "");
    setDailyWage(worker.dailyWage ?? "");

    // scroll to form for convenience
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Add or update worker
  const handleAddWorker = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingWorker) {
        // update existing worker
        await axios.put(
          `http://localhost:5000/api/workers/${editingWorker._id}`,
          {
            name,
            phone,
            dailyWage: Number(dailyWage),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert("Worker Updated");
      } else {
        // create new worker
        await axios.post(
          "http://localhost:5000/api/workers",
          {
            name,
            phone,
            dailyWage: Number(dailyWage),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert("Worker Added");
      }

      // Refresh workers list
      fetchWorkers();

      // Clear form and editing state
      setName("");
      setPhone("");
      setDailyWage("");
      setEditingWorker(null);
    } catch (error) {
      console.log(error);

      alert("Failed to save worker");
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

  const formatCurrency = (amount) => `Rs. ${amount.toLocaleString("en-IN")}`;

  const generatePDF = () => {
    const doc = new jsPDF();

    const now = new Date();

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    // ======================
    // Header
    // ======================
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);

    doc.text("Daily Wage Tracker", 105, 18, {
      align: "center",
    });

    doc.setFontSize(14);

    doc.text("Attendance Register Report", 105, 27, {
      align: "center",
    });

    // Generated Date
    doc.setFontSize(10);

    doc.text(
      `Generated On: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
      14,
      40,
    );

    // Divider
    doc.line(14, 45, 196, 45);

    // ======================
    // Summary
    // ======================
    doc.setFontSize(11);

    doc.text(`Total Workers: ${workers.length}`, 14, 55);

    doc.text(`Monthly Wages: ${formatCurrency(totalWages)}`, 14, 63);

    doc.text(
      `Month: ${now.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`,
      14,
      71,
    );

    // ======================
    // Table Data
    // ======================
    const tableData = attendanceRegister.map((row) => [
      capitalize(row.worker.name),
      row.presentDays,
      row.absentDays,
      formatCurrency(row.totalEarned),
    ]);

    autoTable(doc, {
      startY: 80,

      head: [["Worker", "Present Days", "Absent Days", "Total Earned"]],

      body: tableData,

      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        halign: "center",
      },

      styles: {
        halign: "center",
        fontSize: 10,
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },

      columnStyles: {
        0: {
          halign: "left",
        },
      },
    });

    // ======================
    // Footer
    // ======================
    const pageCount = doc.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      const pageHeight = doc.internal.pageSize.height;

      doc.setFontSize(9);
      doc.setTextColor(120);

      doc.text(
        `Generated by Daily Wage Tracker | Page ${i} of ${pageCount}`,
        105,
        pageHeight - 10,
        { align: "center" },
      );
    }

    doc.save("attendance-register.pdf");
  };

  const uniqueDates = [
    ...new Set(
      attendance.map((item) => new Date(item.date).toLocaleDateString()),
    ),
  ].sort();

  const attendanceRegister = workers.map((worker) => {
    const workerAttendance = attendance.filter(
      (item) => item.workerId?._id === worker._id,
    );

    const presentDays = workerAttendance.filter(
      (item) => item.status === "Present",
    ).length;

    const absentDays = workerAttendance.filter(
      (item) => item.status === "Absent",
    ).length;

    const totalEarned = workerAttendance
      .filter((item) => item.status === "Present")
      .reduce((sum, item) => sum + item.wageForDay, 0);

    return {
      worker,
      workerAttendance,
      presentDays,
      absentDays,
      totalEarned,
    };
  });

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
          <p className="text-2xl md:text-3xl mt-1 font-bold">
            {formatCurrency(totalWages)}
          </p>
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

      <div className="flex justify-end mb-4">
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Export PDF
        </button>
      </div>

      {/* attendance history */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Attendance Register</h2>

        <div className="overflow-x-auto bg-gray-50 rounded-xl shadow-md">
          <table className="min-w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4">Worker</th>

                {uniqueDates.map((date) => (
                  <th key={date} className="p-4">
                    {date}
                  </th>
                ))}

                <th className="p-4">Present</th>
                <th className="p-4">Absent</th>
                <th className="p-4">Total Earned</th>
              </tr>
            </thead>

            <tbody>
              {attendanceRegister.map((row) => (
                <tr key={row.worker._id} className="border-b">
                  <td className="p-4 font-bold">{row.worker.name}</td>

                  {uniqueDates.map((date) => {
                    const record = row.workerAttendance.find(
                      (item) =>
                        new Date(item.date).toLocaleDateString() === date,
                    );

                    return (
                      <td key={date} className="p-4 text-center">
                        {record
                          ? record.status === "Present"
                            ? "P"
                            : "A"
                          : "-"}
                      </td>
                    );
                  })}

                  <td className="p-4 text-green-600 font-bold">
                    {row.presentDays}
                  </td>

                  <td className="p-4 text-yellow-600 font-bold">
                    {row.absentDays}
                  </td>

                  <td className="p-4 font-bold">
                    {formatCurrency(row.totalEarned)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  <p className="text-lg">
                    Daily Wage: {formatCurrency(worker.dailyWage)}
                  </p>

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
