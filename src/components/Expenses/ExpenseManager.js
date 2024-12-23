import React, { useState, useEffect } from "react";
import api from "../../api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import "../../styles/ExpenseManager.css";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    amountRange: "",
    dateRange: "",
  });

  const fetchExpenses = async (filters = {}) => {
    try {
      const response = await api.get("/expenses", { params: filters });
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  };

  useEffect(() => {
    fetchExpenses(filters);
  }, [filters]);

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilter,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      amountRange: "",
      dateRange: "",
    });
    fetchExpenses();
  };

  return (
    <div className="expense-manager">
      <h1>Expense Tracker</h1>
      <ExpenseFilter onFilterChange={handleFilterChange} clearFilters={clearFilters} />
      <ExpenseForm onExpenseAdded={fetchExpenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpenseManager;
