import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import PredictionForm from '../components/PredictionForm';
import PredictionCard from '../components/PredictionCard';

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
        <div className="col-lg-5">
          <PredictionForm
            upcomingFixtures={upcomingFixtures}
            fixtureId={fixtureId}
            onFixtureChange={setFixtureId}
            fanName={fanName}
            onFanNameChange={setFanName}
            homeGoals={homeGoals}
            onHomeGoalsChange={setHomeGoals}
            awayGoals={awayGoals}
            onAwayGoalsChange={setAwayGoals}
            comment={comment}
            onCommentChange={setComment}
            editingId={editingId}
            onCancelEdit={resetForm}
            onSubmit={handleSubmit}
          />
        </div>

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
                <PredictionCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PredictionsPage;