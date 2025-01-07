import React, { useState, useEffect, useCallback } from "react";
import api from "../../api";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import MonthlyExpenses from "./MonthlyExpenses";
import BudgetManager from "../../components/Budget/BudgetManager";
import "../../styles/ExpenseManager.css";

const ExpenseManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({});
  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await api.get("/expenses", { params: { ...filters, month: currentMonth } });
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  }, [currentMonth, filters]);

  const fetchBudgets = useCallback(async () => {
    try {
      const response = await api.get("/budgets", { params: { month: currentMonth } });
      setBudgets(response.data);
    } catch (err) {
      console.error("Error fetching budgets", err);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchExpenses();
  }, [filters, fetchExpenses]);

  useEffect(() => {
    fetchBudgets();
  }, [currentMonth, fetchBudgets]);

  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value); // Expecting a YYYY-MM format
  };

  return (
    <div className="expense-manager">
      <h1>Expense Tracker</h1>

      {/* Unified Month Selector */}
      <div className="month-selector">
        <label htmlFor="month">Select Month:</label>
        <input
          type="month"
          id="month"
          value={currentMonth}
          onChange={handleMonthChange}
        />
      </div>

      <ExpenseFilter onFilterChange={setFilters} />
      <ExpenseForm onExpenseAdded={fetchExpenses} />
      <ExpenseList expenses={expenses} currentMonth={currentMonth} />
      <BudgetManager currentMonth={currentMonth} onBudgetsUpdated={fetchBudgets} />
      <MonthlyExpenses currentMonth={currentMonth} budgets={budgets} />
    </div>
  );
};

export default ExpenseManager;
