import { useState } from "react";

function GroupManager({ people, setPeople }) {
  const [name, setName] = useState("");

  const addPerson = () => {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const alreadyExists = people.some(
      (person) =>
        person.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      alert("This person has already been added.");
      return;
    }

    const newPerson = {
      id: Date.now(),
      name: trimmedName,
    };

    setPeople([...people, newPerson]);
    setName("");
  };

  const deletePerson = (id) => {
    const personToDelete = people.find(
      (person) => person.id === id
    );

    if (!personToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${personToDelete.name}?`
    );

    if (!confirmDelete) return;

    const updatedPeople = people.filter(
      (person) => person.id !== id
    );

    setPeople(updatedPeople);
  };

  return (
    <div>
      <h2>Group Members</h2>

      <div className="form-row">
        <input
          type="text"
          placeholder="Enter person's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addPerson();
            }
          }}
        />

        <button onClick={addPerson}>
          Add Person
        </button>
      </div>

      {people.length > 0 && (
        <div className="members">
          {people.map((person) => (
            <div className="member" key={person.id}>
              <span>{person.name}</span>

              <button
                className="remove-member"
                onClick={() => deletePerson(person.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GroupManager;