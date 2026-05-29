import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function WorkerLogin() {
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `https://daily-wage-tracker-ima6.onrender.com/api/workers/phone/${phone}`,
      );
      localStorage.setItem("worker", JSON.stringify(res.data));

      navigate("/worker-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-gray-50 p-4 md:p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl md:text-3xl text-black font-bold mb-6 text-center">
          Worker Login
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4 bg-white"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkerLogin;
