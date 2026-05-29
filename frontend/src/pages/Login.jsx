import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://daily-wage-tracker-ima6.onrender.com/api/auth/login", {
        phone,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

      alert("Login Successful");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-50 p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Contractor Login
        </h1>

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 bg-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 bg-white"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
