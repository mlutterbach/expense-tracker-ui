import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ExpenseList from "./components/Expenses/ExpenseList";

function App() {
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/expenses"
        element={
          <>
            <ExpenseForm onExpenseAdded={() => {}} />
            <ExpenseList />
          </>
        }
      />
    </Routes>
  </Router>
}

export default App;
