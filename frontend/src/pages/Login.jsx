import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          phone,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Contractor Login
        </h1>

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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;