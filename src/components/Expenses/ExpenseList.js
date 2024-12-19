import React, { useState, useEffect } from "react";
import api from "../../api";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Your Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.date}: {expense.category} - ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
