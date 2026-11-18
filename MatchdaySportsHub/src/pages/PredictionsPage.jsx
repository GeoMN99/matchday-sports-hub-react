import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const PREDICTIONS_URL = 'http://localhost:3001/predictions';
const FIXTURES_URL = 'http://localhost:3001/fixtures';

function PredictionsPage() {
  const location = useLocation();
  const preselectedFixture = location.state?.fixture;

  const { data: fixtures } = useFetch(FIXTURES_URL);
  const {
    data: predictions,
    setData: setPredictions,
    loading,
    error,
  } = useFetch(PREDICTIONS_URL);

  const [fixtureId, setFixtureId] = useState(preselectedFixture?.id || '');
  const [fanName, setFanName] = useState('');
  const [homeGoals, setHomeGoals] = useState('1');
  const [awayGoals, setAwayGoals] = useState('0');
  const [comment, setComment] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (preselectedFixture?.id) {
      setFixtureId(preselectedFixture.id);
    }
  }, [preselectedFixture]);

  const upcomingFixtures = (fixtures || []).filter((f) => f.strStatus === 'NS');

  const resetForm = () => {
    setFixtureId('');
    setFanName('');
    setHomeGoals('1');
    setAwayGoals('0');
    setComment('');
    setEditingId(null);
  };

  // CREATE or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const chosenMatch = (fixtures || []).find((f) => f.id === fixtureId);
    if (!chosenMatch) return;

    const payload = {
      fixtureId: chosenMatch.id,
      matchLabel: `${chosenMatch.strHomeTeam} vs ${chosenMatch.strAwayTeam}`,
      league: chosenMatch.strLeague,
      fanName: fanName.trim() || 'Anonymous Fan',
      homeGoals: Number(homeGoals),
      awayGoals: Number(awayGoals),
      comment: comment.trim(),
    };

    try {
      if (editingId) {
        const res = await fetch(`${PREDICTIONS_URL}/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setPredictions((prev) =>
          prev.map((item) => (item.id === editingId ? updated : item))
        );
      } else {
        const res = await fetch(PREDICTIONS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setPredictions((prev) => [...(prev || []), created]);
      }

      resetForm();
    } catch (err) {
      console.error('Error saving prediction:', err);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setFixtureId(item.fixtureId);
    setFanName(item.fanName);
    setHomeGoals(String(item.homeGoals));
    setAwayGoals(String(item.awayGoals));
    setComment(item.comment || '');
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`${PREDICTIONS_URL}/${id}`, { method: 'DELETE' });
      setPredictions((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      console.error('Error deleting prediction:', err);
    }
  };

  return (
    <div>
      <header className="mb-4">
        <h2 className="fw-bold">Fan Match Predictions</h2>
        <p className="text-white-50">
          Call the scoreline for upcoming fixtures, edit your picks, or delete entries.
        </p>
      </header>

      <div className="row g-4">
        {/* Control Form */}
        <div className="col-lg-5">
          <form onSubmit={handleSubmit} className="card glass-card text-white p-4 shadow">
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
                onChange={(e) => setFixtureId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Select an upcoming match --
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
                onChange={(e) => setFanName(e.target.value)}
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
                  onChange={(e) => setHomeGoals(e.target.value)}
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
                  onChange={(e) => setAwayGoals(e.target.value)}
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
                onChange={(e) => setComment(e.target.value)}
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
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Saved Predictions List */}
        <div className="col-lg-7">
          {loading && <p className="text-info">Loading predictions...</p>}
          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && (!predictions || predictions.length === 0) ? (
            <div className="card glass-card text-white-50 p-5 text-center">
              <i className="bi bi-chat-square-text fs-2 mb-2 text-info"></i>
              <p className="mb-0">No predictions yet. Be the first to call a scoreline!</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {(predictions || []).map((item) => (
                <div key={item.id} className="card glass-card text-white p-3 shadow-sm">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <span className="badge bg-secondary mb-1">{item.league}</span>
                      <h5 className="fw-bold mb-1">{item.matchLabel}</h5>
                      <p className="mb-1 text-info fw-semibold">
                        Predicted Score: {item.homeGoals} - {item.awayGoals}
                      </p>
                      {item.comment && (
                        <p className="small text-white-50 fst-italic mb-1">"{item.comment}"</p>
                      )}
                      <span className="small text-secondary">By {item.fanName}</span>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => handleEditClick(item)}
                        title="Edit prediction"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                        title="Delete prediction"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PredictionsPage;