import React from "react";
import { format, parseISO, isSameMonth } from "date-fns";
import "../../styles/ExpenseManager.css";

const ExpenseList = ({ expenses, currentMonth, filters, onRemoveFilter }) => {
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

      {Object.entries(filters).length > 0 && (
        <div className="filter-tags">
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} className="filter-tag">
              {key === "filter" && value === "week" && "Last Week"}
              {key === "filter" && value === "month" && "Last Month"}
              {key === "filter" && value === "3months" && "Last 3 Months"}
              {key === "start_date" && `From: ${value}`}
              {key === "end_date" && `To: ${value}`}
              {key === "min_amount" && `Min: $${value}`}
              {key === "max_amount" && `Max: $${value}`}
              <button onClick={() => onRemoveFilter(key)}>✖</button>
            </div>
          ))}
        </div>
      )}

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
