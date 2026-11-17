import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import FilterBar from '../components/FilterBar';
import MatchCard from '../components/MatchCard';

const PER_PAGE = 6;

function FixturesPage() {
  const { data: fixtures, loading, error } = useFetch('http://localhost:3001/fixtures');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('4328');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  // Filter handlers reset pagination automatically
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setVisibleCount(PER_PAGE);
  };

  const handleLeagueChange = (value) => {
    setSelectedLeague(value);
    setVisibleCount(PER_PAGE);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setVisibleCount(PER_PAGE);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLeague('all');
    setSelectedStatus('all');
    setVisibleCount(PER_PAGE);
  };

  // Derived state computed directly from fixtures and active filters
  const filteredMatches = (fixtures || []).filter((match) => {
    const matchesLeague =
      selectedLeague === 'all' || match.idLeague === selectedLeague;
    const matchesStatus =
      selectedStatus === 'all' || (match.strStatus || 'FT') === selectedStatus;
    const matchesSearch = `${match.strHomeTeam} ${match.strAwayTeam}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    return matchesLeague && matchesStatus && matchesSearch;
  });

  const visibleMatches = filteredMatches.slice(0, visibleCount);

  return (
    <div>
      {/* Hero Banner */}
      <header className="text-center py-4 mb-4">
        <span className="badge bg-info-subtle text-info border border-info px-3 py-2 rounded-pill fw-semibold mb-3">
          Live Fixtures &amp; Standings
        </span>
        <h1 className="display-5 fw-bold mb-3">Never Miss a Matchday</h1>
        <p className="lead text-white-50 col-lg-8 mx-auto mb-4">
          Filter results across top European leagues in real-time, inspect table standings, or lock in your match predictions.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/standings" className="btn btn-outline-warning px-4">
            <i className="bi bi-trophy me-1"></i> View Standings
          </Link>
          <Link to="/predictions" className="btn btn-primary px-4">
            <i className="bi bi-lightning-charge me-1"></i> Make a Prediction
          </Link>
        </div>
      </header>

      {/* Controlled Filter Controls */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedLeague={selectedLeague}
        onLeagueChange={handleLeagueChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onResetFilters={handleResetFilters}
      />

      {/* Loading & Error Feedback */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading fixtures...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error} — Make sure <code>npm run server</code> is running on port 3001.
        </div>
      )}

      {/* Fixtures Grid */}
      {!loading && !error && (
        <>
          {filteredMatches.length === 0 ? (
            <div className="text-center py-5 text-white-50">
              <i className="bi bi-search fs-2 d-block mb-2 text-warning"></i>
              No fixtures match your selected filters.
            </div>
          ) : (
            <section className="row">
              {visibleMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </section>
          )}

          {/* Load More Pagination */}
          {visibleCount < filteredMatches.length && (
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-outline-info btn-lg px-5"
                onClick={() => setVisibleCount((prev) => prev + PER_PAGE)}
              >
                Load More ({filteredMatches.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FixturesPage;