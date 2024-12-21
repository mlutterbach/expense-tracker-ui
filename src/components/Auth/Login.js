import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Login = () => {
  const [formData, setFormData] = useState({email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful! Redirect to dashboard.")
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")} style={{ color: "blue", background: "none", border: "none", cursor: "pointer" }}>
          Register Here
        </button>
      </p>
    </div>
  );
};

export default Login;
