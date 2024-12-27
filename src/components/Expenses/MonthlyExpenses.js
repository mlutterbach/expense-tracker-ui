import React, { useState, useEffect } from "react";
import api from "../../api";
import "../../styles/MonthlyExpenses.css"

const MonthlyExpenses = () => {
  const [month, setMonth] = useState(new Date().toISOString().slice(0,7));
  const [expensesByCategory, setExpensesByCategory] = useState([]);

  const fetchMonthlyExpensesByCategory = async (selectedMonth) => {
    try {
      const response = await api.get("/expenses/monthly_by_category", {
        params: { month: selectedMonth },
      });
      setExpensesByCategory(response.data[selectedMonth] || {});
    } catch (err) {
      console.error("Error fetching monthly expenses by category", err);
    }
  };

  useEffect(() => {
    fetchMonthlyExpensesByCategory(month);
  }, [month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="monthly-expenses">
      <h2>Total Monthly Expenses by Category</h2>
      <div className="month-selector">
        <label htmlFor="month">Select Month: </label>
        <input
          type="month"
          id="month"
          value={month}
          onChange={handleMonthChange}
        />
      </div>
      <ul className="expense-list">
        {Object.entries(expensesByCategory).map(([category, amount]) => (
          <li key={category} className={category}>
            {category}: ${amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyExpenses;
