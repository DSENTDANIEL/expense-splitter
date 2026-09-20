import { useState, useEffect } from "react";
import GroupManager from "./GroupManager";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import BalanceSummary from "./BalanceSummary";
import "./App.css";

function App() {
  const [people, setPeople] = useState(() => {
    const savedPeople = localStorage.getItem("people");
    return savedPeople ? JSON.parse(savedPeople) : [];
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="app">
      <div className="header">
        <h1>Expense Splitter</h1>
        <p>Split shared expenses easily with your group.</p>
      </div>

      <div className="card">
        <GroupManager
          people={people}
          setPeople={setPeople}
        />
      </div>

      <div className="card">
        <ExpenseForm
          people={people}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      </div>

      <div className="card">
        <ExpenseList
          expenses={expenses}
          setExpenses={setExpenses}
        />
      </div>

      <div className="card">
        <BalanceSummary
          people={people}
          expenses={expenses}
        />
      </div>
    </div>
  );
}

export default App;