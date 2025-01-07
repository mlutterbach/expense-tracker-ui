import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "../../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signin", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful! Redirect to dashboard.");
      navigate("/expenses");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="primary-button">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="nav-button">
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
