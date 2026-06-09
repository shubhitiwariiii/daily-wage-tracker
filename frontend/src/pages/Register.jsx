import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://daily-wage-tracker-ima6.onrender.com/api/auth/register", {
        name,
        phone,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

      alert("Registration Successful");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Register form uses `card` and shared input/button styles for consistency */}
      <form onSubmit={handleRegister} className="card w-full max-w-md">
        <h1 className="text-2xl md:text-3xl text-black font-bold mb-6 text-center">Contractor Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input mb-4"
        />

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

        <button type="submit" className="btn btn-primary w-full">Register</button>

        <p className="mt-4 text-center">Already have an account? {" "}
          <Link to="/login" className="text-blue-600 font-medium">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
