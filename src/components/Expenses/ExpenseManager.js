import React, { useState, useEffect } from "react";
import api from "../../api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import MonthlyExpenses from "./MonthlyExpenses";
import "../../styles/ExpenseManager.css";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({});

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
    setFilters(newFilter);
  };

  return (
    <div className="expense-manager">
      <h1>Expense Tracker</h1>
      <ExpenseFilter onFilterChange={handleFilterChange} />
      <ExpenseForm onExpenseAdded={fetchExpenses} />
      <ExpenseList expenses={expenses} />
      <MonthlyExpenses />
    </div>
  );
};

export default ExpenseManager;
