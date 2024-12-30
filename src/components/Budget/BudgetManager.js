import React, { useState, useEffect, useCallback } from "react";
import api from "../../api";
import "../../styles/BudgetManager.css";

const BudgetManager = ({ currentMonth, onBudgetsUpdated }) => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: "", amount: "" });
  const [isAdding, setIsAdding] = useState(false);

  const fetchBudgets = useCallback(async () => {
    try {
      const response = await api.get("/budgets", { params: { month: currentMonth } });
      setBudgets(response.data);
      if (onBudgetsUpdated) onBudgetsUpdated();
    } catch (err) {
      console.error("Error fetching budgets", err);
    }
  }, [currentMonth, onBudgetsUpdated]);

  const handleAddBudget = async () => {
    try {
      const response = await api.post("/budgets", { ...newBudget, month: currentMonth });
      setBudgets([response.data]); // Assume only one budget per month
      setNewBudget({ category: "", amount: "" });
      setIsAdding(false);
      if (onBudgetsUpdated) onBudgetsUpdated();
    } catch (err) {
      console.error("Error adding budget", err);
    }
  };

  const handleEditBudget = async (id, updatedBudget) => {
    try {
      const response = await api.put(`/budgets/${id}`, updatedBudget);
      setBudgets([response.data]); // Update with the edited budget
    } catch (err) {
      console.error("Error updating budget", err);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await api.delete(`/budgets/${id}`);
      setBudgets([]);
      setIsAdding(false); // Allow the user to add a new budget after deletion
      if (onBudgetsUpdated) onBudgetsUpdated();
    } catch (err) {
      console.error("Error deleting budget", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <div className="budget-manager">
      <h2>Manage Monthly Budgets</h2>

      {budgets.length === 0 && !isAdding ? (
        <div className="no-budget">
          <p>Would you like to add a budget for this month?</p>
          <button onClick={() => setIsAdding(true)}>Add a Budget</button>
        </div>
      ) : isAdding ? (
        <div className="add-budget">
          <input
            type="text"
            placeholder="Category"
            value={newBudget.category}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) || "" })}
          />
          <button onClick={handleAddBudget}>Save Budget</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              <div className="budget-details">
                <span>Amount: ${(parseFloat(budget.amount) || 0).toFixed(2)}</span>
              </div>
              <button onClick={() => handleEditBudget(budget.id, newBudget)}>Edit</button>
              <button onClick={() => handleDeleteBudget(budget.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgetManager;
