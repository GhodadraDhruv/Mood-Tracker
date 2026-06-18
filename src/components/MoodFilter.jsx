import "../styles/MoodFilter.css";

function MoodFilter({ filter, setFilter }) {
  return (
    <div className="card">
      <h2>Filter Mood</h2>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Happy</option>
        <option>Calm</option>
        <option>Neutral</option>
        <option>Sad</option>
        <option>Tired</option>
      </select>
    </div>
  );
}

export default MoodFilter;