import React from "react";
import { format, parseISO, isSameMonth } from "date-fns";
import "../../styles/ExpenseManager.css";

const ExpenseList = ({ expenses, currentMonth }) => {
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = parseISO(expense.date);
    return isSameMonth(expenseDate, parseISO(`${currentMonth}-01`));
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  return (
    <div>
      <h2>Your {format(parseISO(`${currentMonth}-01`), "MMMM yyyy")} Expenses</h2>

      {filteredExpenses.length > 0 ? (
        <ul>
          {filteredExpenses.map((expense) => (
            <li key={expense.id} className={expense.category}>
              <span>{formatDate(expense.date)}</span>
              <span>{expense.category} - ${expense.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Currently, there are no expenses submitted for this month.</p>
      )}
    </div>
  );
};

export default ExpenseList;
