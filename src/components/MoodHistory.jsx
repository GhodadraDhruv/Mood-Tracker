import "../styles/MoodHistory.css";

const moodEmoji = {
  Happy: "😀",
  Calm: "😌",
  Neutral: "😐",
  Sad: "😔",
  Tired: "😴",
};

function MoodHistory({ entries, deleteEntry }) {
  return (
    <div className="card">
      <h2>Mood History</h2>

      {entries.length === 0 ? (
        <p>No entries found.</p>
      ) : (
        entries.map((entry) => (
          <div className="history-card" key={entry.id}>
            <h3>
              {moodEmoji[entry.mood]} {entry.mood}
            </h3>

            <p>
              <strong>Energy:</strong> {entry.energy}/5
            </p>

            <p>{entry.note || "No note added"}</p>

            <p className="date">{entry.date}</p>

            <button
              className="delete-btn"
              onClick={() => deleteEntry(entry.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MoodHistory;