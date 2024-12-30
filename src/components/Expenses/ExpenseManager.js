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
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));

  const fetchExpenses = useCallback(async (filters = {}) => {
    try {
      const response = await api.get("/expenses", { params: filters });
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  }, []);

  // Fetch budgets based on currentMonth
  const fetchBudgets = useCallback(async () => {
    try {
      const response = await api.get("/budgets", { params: { month: currentMonth } });
      setBudgets(response.data);
    } catch (err) {
      console.error("Error fetching budgets", err);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchExpenses(filters);
  }, [filters, fetchExpenses]);

  useEffect(() => {
    fetchBudgets();
  }, [currentMonth, fetchBudgets]);

  const handleFilterChange = (newFilter) => {
    setFilters(newFilter);
  };

  return (
    <div className="expense-manager">
      <h1>Expense Tracker</h1>
      <ExpenseFilter onFilterChange={handleFilterChange} />
      <ExpenseForm onExpenseAdded={fetchExpenses} />
      <ExpenseList expenses={expenses} />
      <BudgetManager currentMonth={currentMonth} onBudgetsUpdated={fetchBudgets} />
      <MonthlyExpenses currentMonth={currentMonth} budgets={budgets} />
    </div>
  );
};

export default ExpenseManager;
