import { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { FavoritesContext } from '../context/FavoritesContext';

function MatchDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useContext(FavoritesContext);

  const {
    data: match,
    loading,
    error,
  } = useFetch(`http://localhost:3001/fixtures/${id}`);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading match details...</span>
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="text-center py-5">
        <h3 className="text-warning fw-bold">Match Not Found</h3>
        <p className="text-white-50">No fixture exists for ID #{id}.</p>
        <Link to="/" className="btn btn-outline-info">
          Back to Fixtures
        </Link>
      </div>
    );
  }

  const isFinished = match.strStatus === 'FT' || match.intHomeScore !== null;
  const isSaved = favoriteIds.includes(match.id);

  return (
    <div className="col-lg-8 mx-auto">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm text-light mb-3"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-1"></i> Back
      </button>

      <div className="card glass-card text-white p-4 p-md-5 shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="badge bg-info text-dark fw-semibold px-3 py-2">
            {match.strLeague}
          </span>
          <button
            type="button"
            className={`btn btn-sm ${isSaved ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => toggleFavorite(match.id)}
          >
            <i className={`bi ${isSaved ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
            {isSaved ? 'Saved in Watchlist' : 'Add to Watchlist'}
          </button>
        </div>

        <div className="row align-items-center text-center my-4">
          <div className="col-4">
            <img
              src={match.strHomeBadge}
              alt={match.strHomeTeam}
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              className="mb-2"
            />
            <h4 className="fw-bold">{match.strHomeTeam}</h4>
          </div>

          <div className="col-4">
            <div className="display-6 fw-bold text-info">
              {isFinished ? `${match.intHomeScore} - ${match.intAwayScore}` : 'VS'}
            </div>
            <span className={`badge mt-2 ${isFinished ? 'bg-success' : 'bg-warning text-dark'}`}>
              {isFinished ? 'Full Time' : 'Upcoming Kickoff'}
            </span>
          </div>

          <div className="col-4">
            <img
              src={match.strAwayBadge}
              alt={match.strAwayTeam}
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              className="mb-2"
            />
            <h4 className="fw-bold">{match.strAwayTeam}</h4>
          </div>
        </div>

        <div className="border-top border-secondary pt-3 mt-3 d-flex justify-content-between flex-wrap gap-2 text-white-50">
          <span>
            <i className="bi bi-geo-alt-fill text-info me-2"></i>
            Venue: <strong className="text-white">{match.strVenue}</strong>
          </span>
          <span>
            <i className="bi bi-calendar-event text-info me-2"></i>
            Date: <strong className="text-white">{match.dateEvent}</strong>
          </span>
        </div>

        {!isFinished && (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="btn btn-primary px-5 fw-semibold"
              onClick={() => navigate('/predictions', { state: { fixture: match } })}
            >
              <i className="bi bi-lightning-charge me-1"></i> Predict This Match
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatchDetailsPage;