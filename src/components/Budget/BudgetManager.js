import React, { useState, useEffect, useCallback } from "react";
import api from "../../api";
import "../../styles/BudgetManager.css";

const BudgetManager = ({ currentMonth, onBudgetsUpdated }) => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ amount: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [editingBudgetId, setEditingBudgetId] = useState(null);

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
      setNewBudget({ amount: "" });
      setIsAdding(false);
      if (onBudgetsUpdated) onBudgetsUpdated();
    } catch (err) {
      console.error("Error adding budget", err);
    }
  };

  const handleEditBudget = async () => {
    try {
      const response = await api.put(`/budgets/${editingBudgetId}`, { amount: newBudget.amount });
      setBudgets([response.data]);
      setEditingBudgetId(null);
      setNewBudget({ amount: "" });
      if (onBudgetsUpdated) onBudgetsUpdated();
    } catch (err) {
      console.error("Error updating budget", err);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await api.delete(`/budgets/${id}`);
      setBudgets([]);
      setIsAdding(false);
      if (onBudgetsUpdated) onBudgetsUpdated();
    } catch (err) {
      console.error("Error deleting budget", err);
    }
  };

  const handleStartEditing = (budget) => {
    setEditingBudgetId(budget.id);
    setNewBudget({ amount: budget.amount });
  };

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  return (
    <div className="budget-manager">
      <h2>Manage Monthly Budgets</h2>

      {budgets.length === 0 && !isAdding && editingBudgetId === null ? (
        <div className="no-budget">
          <p>Would you like to add a budget for this month?</p>
          <button onClick={() => setIsAdding(true)}>Add a Budget</button>
        </div>
      ) : isAdding || editingBudgetId !== null ? (
        <div className="add-budget">
          <input
            type="number"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) || "" })}
          />
          <button onClick={editingBudgetId ? handleEditBudget : handleAddBudget}>
            {editingBudgetId ? "Update Budget" : "Save Budget"}
          </button>
          <button onClick={() => {
            setIsAdding(false);
            setEditingBudgetId(null);
            setNewBudget({ amount: "" });
          }}>
            Cancel
          </button>
        </div>
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              <div className="budget-details">
                <span>Amount: ${(parseFloat(budget.amount) || 0).toFixed(2)}</span>
              </div>
              <button onClick={() => handleStartEditing(budget)}>Edit</button>
              <button onClick={() => handleDeleteBudget(budget.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BudgetManager;
