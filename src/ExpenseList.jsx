function ExpenseList({ expenses, setExpenses }) {
  const deleteExpense = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <div>
          {expenses.map((expense) => (
            <div className="expense-item" key={expense.id}>
              <div>
                <h3>{expense.title}</h3>

                <p>
                  ₦{expense.amount.toLocaleString()} paid by{" "}
                  <strong>{expense.payer}</strong>
                </p>

                <p>
                  <strong>Participants:</strong>{" "}
                  {expense.participants.join(", ")}
                </p>
              </div>

              <button
                className="delete-button"
                onClick={() => deleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;