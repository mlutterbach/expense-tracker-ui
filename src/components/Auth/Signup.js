import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Signup = () => {
  const [formData, setFormData] = useState({email: "", password: "", password_confirmation:"" });
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup", formData);
      localStorage.setItem("token", response.data.token);
      alert("Signup successful! Redirect to login or dashboard.")
      navigate("/expenses");
    } catch (err) {
      seterror(err.response.data.errors.join(", "));
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.password_confirmation}
          onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
