import React, { useState } from "react";
import api from "../../api";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/expenses", formData);
      alert("Expense added!");
      setFormData({ amount: "", category: "", description: "", date: "" })
      onExpenseAdded();
    } catch (err) {
      alert("Error adding expense");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({...formData, amount: e.target.value })}
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({...formData, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        <option value="Groceries">Groceries</option>
        <option value="Leisure">Leisure</option>
        <option value="Electronics">Electronics</option>
        <option value="Utilities">Utilities</option>
        <option value="Clothing">Clothing</option>
        <option value="Health">Health</option>
        <option value="Others">Others</option>
      </select>
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      ></textarea>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
