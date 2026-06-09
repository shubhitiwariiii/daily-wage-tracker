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
      {/* Worker login reuses the same card and form tokens */}
      <div className="card w-full max-w-md">
        <h1 className="text-2xl md:text-3xl text-black font-bold mb-6 text-center">Worker Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input mb-4"
          />

          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  );
}

export default WorkerLogin;
