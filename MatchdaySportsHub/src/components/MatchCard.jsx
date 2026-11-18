import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

function MatchCard({ match }) {
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = useContext(FavoritesContext);

  const {
    id,
    strHomeTeam,
    strAwayTeam,
    strHomeBadge,
    strAwayBadge,
    intHomeScore,
    intAwayScore,
    strLeague,
    strStatus,
    dateEvent,
    strVenue,
  } = match;

  const isFinished = strStatus === 'FT' || (intHomeScore !== null && intHomeScore !== '');
  const isSaved = favoriteIds.includes(id);

  const formattedDate = dateEvent
    ? new Date(dateEvent).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Scheduled';

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 glass-card text-white shadow">
        <div className="card-body d-flex flex-column justify-content-between p-3">
          {/* Top Badges + Favorite Toggle */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-secondary border border-secondary text-light">
              {strLeague}
            </span>

            <div className="d-flex align-items-center gap-2">
              <span
                className={`badge fw-bold ${
                  isFinished ? 'bg-success text-white' : 'bg-warning text-dark'
                }`}
              >
                {isFinished ? 'Finished' : 'Upcoming'}
              </span>
              <button
                type="button"
                className="btn btn-sm p-0 border-0 text-warning"
                onClick={() => toggleFavorite(id)}
                title={isSaved ? 'Remove from watchlist' : 'Save match'}
              >
                <i className={`bi ${isSaved ? 'bi-star-fill' : 'bi-star'} fs-5`}></i>
              </button>
            </div>
          </div>

          {/* Teams & Scoreline */}
          <div className="d-flex justify-content-around align-items-center text-center my-2">
            <div className="flex-fill">
              <img
                src={strHomeBadge}
                alt={strHomeTeam}
                className="team-badge mb-2 d-block mx-auto"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/48?text=FC';
                }}
              />
              <span className="fw-bold fs-6 d-block">{strHomeTeam}</span>
            </div>

            <div className="px-2">
              <span className="badge bg-primary fs-6 px-3 py-2">
                {isFinished ? `${intHomeScore} - ${intAwayScore}` : 'VS'}
              </span>
            </div>

            <div className="flex-fill">
              <img
                src={strAwayBadge}
                alt={strAwayTeam}
                className="team-badge mb-2 d-block mx-auto"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/48?text=FC';
                }}
              />
              <span className="fw-bold fs-6 d-block">{strAwayTeam}</span>
            </div>
          </div>

          {/* Footer Metadata & Action Buttons */}
          <div className="border-top border-secondary pt-2 mt-3 small text-white-50">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>
                <i className="bi bi-geo-alt-fill text-info me-1"></i>
                {strVenue || 'Stadium'}
              </span>
              <span>
                <i className="bi bi-calendar-event me-1"></i>
                {formattedDate}
              </span>
            </div>

            <div className="d-flex gap-2">
              <Link
                to={`/matches/${id}`}
                className="btn btn-outline-light btn-sm flex-grow-1"
              >
                Details
              </Link>

              {!isFinished && (
                <button
                  type="button"
                  className="btn btn-outline-info btn-sm flex-grow-1 fw-semibold"
                  onClick={() => navigate('/predictions', { state: { fixture: match } })}
                >
                  Predict Score
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;