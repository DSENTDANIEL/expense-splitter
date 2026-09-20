import { useState } from "react";

function ExpenseForm({ people, expenses, setExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [participants, setParticipants] = useState([]);

  const toggleParticipant = (name) => {
    if (participants.includes(name)) {
      setParticipants(
        participants.filter((person) => person !== name)
      );
    } else {
      setParticipants([...participants, name]);
    }
  };

  const addExpense = () => {
    if (
      !title.trim() ||
      !amount ||
      Number(amount) <= 0 ||
      !payer ||
      participants.length === 0
    ) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      payer,
      participants,
    };

    setExpenses([...expenses, newExpense]);

    setTitle("");
    setAmount("");
    setPayer("");
    setParticipants([]);
  };

  return (
    <div>
      <h2>Add Expense</h2>

      {people.length === 0 ? (
        <p>Add group members first before creating an expense.</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Expense title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
          >
            <option value="">Who paid?</option>

            {people.map((person) => (
              <option key={person.id} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>

          <h3>Who participated?</h3>

          {people.map((person) => (
            <label
              className="participant"
              key={person.id}
            >
              <input
                type="checkbox"
                checked={participants.includes(person.name)}
                onChange={() =>
                  toggleParticipant(person.name)
                }
              />

              {person.name}
            </label>
          ))}

          <button onClick={addExpense}>
            Add Expense
          </button>
        </>
      )}
    </div>
  );
}

export default ExpenseForm;