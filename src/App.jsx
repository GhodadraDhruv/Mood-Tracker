import { useEffect, useMemo, useState } from "react";
import MoodForm from "./components/MoodForm";
import MoodFilter from "./components/MoodFilter";
import MoodHistory from "./components/MoodHistory";
import MoodSummary from "./components/MoodSummary";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedEntries = localStorage.getItem("moodEntries");

    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries([entry, ...entries]);
  };

  const deleteEntry = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );

    if (confirmDelete) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const filteredEntries =
    filter === "All"
      ? entries
      : entries.filter((entry) => entry.mood === filter);

  const summary = useMemo(() => {
    const totalEntries = entries.length;

    const averageEnergy =
      totalEntries === 0
        ? 0
        : (
            entries.reduce((sum, item) => sum + item.energy, 0) /
            totalEntries
          ).toFixed(1);

    const moodCount = {};

    entries.forEach((entry) => {
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    });

    let mostSelectedMood = "-";

    if (Object.keys(moodCount).length) {
      mostSelectedMood = Object.keys(moodCount).reduce((a, b) =>
        moodCount[a] > moodCount[b] ? a : b
      );
    }

    return {
      totalEntries,
      averageEnergy,
      mostSelectedMood,
    };
  }, [entries]);

  return (
    <div className="container">
      <h1>Daily Mood & Energy Tracker</h1>

      <MoodForm addEntry={addEntry} />

      <MoodFilter filter={filter} setFilter={setFilter} />

      <MoodSummary summary={summary} />

      <MoodHistory
        entries={filteredEntries}
        deleteEntry={deleteEntry}
      />
    </div>
  );
}

export default App;