import { useState } from "react";
import "../styles/MoodForm.css";

const moods = [
  { emoji: "😀", value: "Happy" },
  { emoji: "😌", value: "Calm" },
  { emoji: "😐", value: "Neutral" },
  { emoji: "😔", value: "Sad" },
  { emoji: "😴", value: "Tired" },
];

function MoodForm({ addEntry }) {
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!mood) {
      newErrors.mood = "Mood is required";
    }

    if (!energy) {
      newErrors.energy = "Energy level is required";
    }

    if (note.length > 200) {
      newErrors.note = "Maximum 200 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const entry = {
      id: Date.now(),
      mood,
      energy: Number(energy),
      note,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    addEntry(entry);

    setMood("");
    setEnergy("");
    setNote("");
  };

  return (
    <div className="card">
      <h2>Add Mood Entry</h2>

      <form onSubmit={handleSubmit}>
        <label>Mood</label>

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">Select Mood</option>

          {moods.map((mood) => (
            <option key={mood.value} value={mood.value}>
              {mood.emoji} {mood.value}
            </option>
          ))}
        </select>

        {errors.mood && (
          <span className="error">{errors.mood}</span>
        )}

        <label>Energy Level</label>

        <input
          type="number"
          min="1"
          max="5"
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
        />

        {errors.energy && (
          <span className="error">{errors.energy}</span>
        )}

        <label>Note</label>

        <textarea
          maxLength="200"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <small>{note.length}/200</small>

        <button type="submit">Save Entry</button>
      </form>
    </div>
  );
}

export default MoodForm;