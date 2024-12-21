import React from "react";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ExpenseList from "./components/Expenses/ExpenseList";
import ProjectedRoute from "./components/ProjectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/expenses"
          element={
            <ProjectedRoute>
              <>
                <ExpenseForm onExpenseAdded={() => {}} />
                <ExpenseList />
              </>
            </ProjectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App;
