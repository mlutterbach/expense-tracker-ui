import React, { useState, useEffect, useCallback } from "react";
import api from "../../api";
import "../../styles/MonthlyExpenses.css";

const MonthlyExpenses = ({ currentMonth, budgets = [] }) => {
  const [expensesByCategory, setExpensesByCategory] = useState({});

  const fetchMonthlyExpensesByCategory = useCallback(async () => {
    try {
      const response = await api.get("/expenses/monthly_by_category", {
        params: { month: currentMonth },
      });
      setExpensesByCategory(response.data[currentMonth] || {});
    } catch (err) {
      console.error("Error fetching monthly expenses by category", err);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchMonthlyExpensesByCategory();
  }, [currentMonth, budgets, fetchMonthlyExpensesByCategory]);

  const totalSpent = Object.values(expensesByCategory).reduce((sum, amount) => {
    const numericAmount = parseFloat(amount) || 0;
    return sum + numericAmount;
  }, 0);

  const totalBudget = (budgets || []).reduce((sum, budget) => {
    const amount = parseFloat(budget.amount) || 0;
    return sum + amount;
  }, 0);

  const getCategoryClass = (category) => {
    const categoryClasses = {
      Groceries: "groceries",
      Leisure: "leisure",
      Electronics: "electronics",
      Utilities: "utilities",
      Clothing: "clothing",
      Health: "health",
      Others: "others",
    };
    return categoryClasses[category] || "";
  };

  const showBudgetSummary = totalBudget > 0 || totalSpent > 0;

  return (
    <div className="monthly-expenses">
      <h2 className="monthly-expenses-title">Monthly Expenses Overview</h2>

      {/* Conditionally Render Budget Summary */}
      {showBudgetSummary && (
        <div className="budget-summary">
          {totalBudget > 0 && (
            <p>
              <strong>Total Budget:</strong> ${totalBudget.toFixed(2)}
            </p>
          )}
          <p>
            <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
          </p>
          {totalBudget > 0 && (
            <p>
              <strong>Remaining:</strong> $
              {(totalBudget - totalSpent).toFixed(2)}
            </p>
          )}
        </div>
      )}

      {Object.keys(expensesByCategory).length > 0 && (
        <div className="expenses-category">
          <h3>Expenses by Category</h3>
          <ul>
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <li key={category} className={getCategoryClass(category)}>
                <span className="category-name">{category}</span>:
                <span className="category-amount">
                  ${parseFloat(amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpenses;
