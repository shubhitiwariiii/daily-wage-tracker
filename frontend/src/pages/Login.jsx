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
      const res = await axios.post(
        "https://daily-wage-tracker-ima6.onrender.com/api/auth/login",
        {
          phone,
          password,
        },
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

      alert("Login Successful");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      alert(error.response?.data?.message || error.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Form uses `card` to get consistent padding, radius and shadow */}
      <form onSubmit={handleLogin} className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">Contractor Login</h1>

        {/* Inputs use shared `.form-input` for consistent spacing and focus */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-input mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input mb-4"
        />

        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account? {" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
