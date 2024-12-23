import React from "react";
import { format } from "date-fns";
import "../../styles/ExpenseManager.css";

const ExpenseList = ({ expenses }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  return (
    <div>
      <h2>Your Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className={expense.category}>
            <span>{formatDate(expense.date)}</span>
            <span>{expense.category} - ${expense.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
