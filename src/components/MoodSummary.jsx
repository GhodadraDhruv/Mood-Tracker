import PropTypes from "prop-types";
import "../styles/MoodSummary.css";

function MoodSummary({ summary }) {
  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Total Entries</h3>
        <p>{summary.totalEntries}</p>
      </div>

      <div className="summary-card">
        <h3>Most Selected Mood</h3>
        <p>{summary.mostSelectedMood}</p>
      </div>

      <div className="summary-card">
        <h3>Average Energy</h3>
        <p>{summary.averageEnergy}</p>
      </div>
    </div>
  );
}

MoodSummary.propTypes = {
  summary: PropTypes.shape({
    totalEntries: PropTypes.number,
    mostSelectedMood: PropTypes.string,
    averageEnergy: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
};

export default MoodSummary;