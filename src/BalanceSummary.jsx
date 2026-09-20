function BalanceSummary({ people, expenses }) {
  const balances = {};

  // Start everyone's balance at ₦0
  people.forEach((person) => {
    balances[person.name] = 0;
  });

  // Calculate each person's balance
  expenses.forEach((expense) => {
    const share = expense.amount / expense.participants.length;

    expense.participants.forEach((person) => {
      balances[person] -= share;
    });

    balances[expense.payer] += expense.amount;
  });

  return (
    <div>
      <h2>Balance Summary</h2>

      {people.length === 0 ? (
        <p>Add some group members to see balances.</p>
      ) : (
        people.map((person) => {
          const balance = balances[person.name];

          return (
            <div className="balance" key={person.id}>
              <strong>{person.name}</strong>

              {balance > 0 ? (
                <span className="positive">
                  You are owed ₦{balance.toFixed(2)}
                </span>
              ) : balance < 0 ? (
                <span className="negative">
                  You owe ₦{Math.abs(balance).toFixed(2)}
                </span>
              ) : (
                <span>Settled up</span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default BalanceSummary;