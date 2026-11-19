function PredictionForm({
  upcomingFixtures,
  fixtureId,
  onFixtureChange,
  fanName,
  onFanNameChange,
  homeGoals,
  onHomeGoalsChange,
  awayGoals,
  onAwayGoalsChange,
  comment,
  onCommentChange,
  editingId,
  onCancelEdit,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="card glass-card text-white p-4 shadow">
      <h5 className="fw-bold text-info mb-3">
        {editingId ? 'Edit Your Prediction' : 'Submit a Prediction'}
      </h5>

      <div className="mb-3">
        <label htmlFor="fixture-select" className="form-label small text-info fw-semibold">
          Upcoming Fixture
        </label>
        <select
          id="fixture-select"
          className="form-select bg-dark text-white border-secondary"
          value={fixtureId}
          onChange={(e) => onFixtureChange(e.target.value)}
          required
        >
          <option value="" disabled>
            Select an upcoming match 
          </option>
          {upcomingFixtures.map((match) => (
            <option key={match.id} value={match.id}>
              {match.strHomeTeam} vs {match.strAwayTeam} ({match.strLeague})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="fan-name" className="form-label small text-info fw-semibold">
          Your Name
        </label>
        <input
          type="text"
          id="fan-name"
          className="form-control bg-dark text-white border-secondary"
          placeholder="e.g. George"
          value={fanName}
          onChange={(e) => onFanNameChange(e.target.value)}
          required
        />
      </div>

      <div className="row g-2 mb-3">
        <div className="col-6">
          <label htmlFor="home-goals" className="form-label small text-info fw-semibold">
            Home Score
          </label>
          <input
            type="number"
            id="home-goals"
            min="0"
            max="15"
            className="form-control bg-dark text-white border-secondary"
            value={homeGoals}
            onChange={(e) => onHomeGoalsChange(e.target.value)}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="away-goals" className="form-label small text-info fw-semibold">
            Away Score
          </label>
          <input
            type="number"
            id="away-goals"
            min="0"
            max="15"
            className="form-control bg-dark text-white border-secondary"
            value={awayGoals}
            onChange={(e) => onAwayGoalsChange(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="fan-comment" className="form-label small text-info fw-semibold">
          Match Take (Optional)
        </label>
        <textarea
          id="fan-comment"
          rows="2"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Who scores first?"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary flex-grow-1 fw-semibold">
          {editingId ? 'Save Changes' : 'Post Prediction'}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-outline-secondary text-light"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default PredictionForm;