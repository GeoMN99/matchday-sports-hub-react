import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import FilterBar from '../components/FilterBar';
import MatchCard from '../components/MatchCard';

const PER_PAGE = 6;

function FixturesPage() {
  const navigate = useNavigate();
  const { data: fixtures, loading, error } = useFetch('http://localhost:3001/fixtures');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('4328');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

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

  //  First upcoming match spotlit inside the stadium hero
  const spotlightMatch = (fixtures || []).find((m) => m.strStatus === 'NS');

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
      {/* Floodlit Stadium Hero Banner */}
      <header className="stadium-hero p-4 p-md-5 mb-5">
        <div className="row align-items-center g-4">
          {/* Left Column: Editorial Headline & Primary CTA */}
          <div className="col-lg-7">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 border border-success border-opacity-50 bg-dark bg-opacity-75">
              <span
                className="rounded-circle bg-success"
                style={{ width: '8px', height: '8px' }}
              ></span>
              <span className="small fw-semibold text-uppercase text-light">
                Matchday Centre
              </span>
            </div>

            <h1 className="display-4 fw-bold text-uppercase text-white mb-3 lh-1">
              Every Fixture Every Table <br />
              <span style={{ color: '#10b981' }}>Call The Scoreline.</span>
            </h1>

            <p className="text-light opacity-75 mb-4 col-xl-10">
              Follow real-time match results across Europe&apos;s top five competitions, check live league standings.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link to="/predictions" className="btn btn-pitch btn-lg px-4 shadow-sm">
                <i className="bi bi-lightning-charge-fill me-2"></i>
                Predict Match Scores
              </Link>
              <Link to="/standings" className="btn btn-outline-light btn-lg px-4">
                <i className="bi bi-trophy me-2 text-warning"></i>
                League Tables
              </Link>
            </div>
          </div>

          {/*  Featured Upcoming Kickoff match */}
          {spotlightMatch && (
            <div className="col-lg-5">
              <div
                className="p-4 rounded-4 border border-light border-opacity-10"
                style={{ backgroundColor: 'rgba(19, 25, 34, 0.88)', backdropFilter: 'blur(8px)' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-warning text-dark fw-bold text-uppercase">
                    Featured Kickoff
                  </span>
                  <span className="small text-white-50">{spotlightMatch.strLeague}</span>
                </div>

                <div className="d-flex justify-content-between align-items-center text-center my-3">
                  <div className="flex-fill">
                    <img
                      src={spotlightMatch.strHomeBadge}
                      alt={spotlightMatch.strHomeTeam}
                      className="team-badge mb-2 mx-auto d-block"
                    />
                    <div className="fw-bold small">{spotlightMatch.strHomeTeam}</div>
                  </div>

                  <div className="px-3">
                    <span className="score-pill px-3 py-1 rounded fs-5 fw-bold">VS</span>
                  </div>

                  <div className="flex-fill">
                    <img
                      src={spotlightMatch.strAwayBadge}
                      alt={spotlightMatch.strAwayTeam}
                      className="team-badge mb-2 mx-auto d-block"
                    />
                    <div className="fw-bold small">{spotlightMatch.strAwayTeam}</div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25">
                  <span className="small text-white-50">
                    <i className="bi bi-geo-alt text-success me-1"></i>
                    {spotlightMatch.strVenue}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-pitch px-3"
                    onClick={() =>
                      navigate('/predictions', { state: { fixture: spotlightMatch } })
                    }
                  >
                    Predict Now &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Section Header */}
      <div className="d-flex justify-content-between align-items-end mb-3">
        <div>
          <h2 className="fw-bold text-uppercase mb-0">Matchday Fixtures</h2>
          <p className="small text-white-50 mb-0">
            Showing {visibleMatches.length} of {filteredMatches.length} fixtures
          </p>
        </div>
      </div>

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
          <div className="spinner-border text-success" role="status">
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

          {/* Load More */}
          {visibleCount < filteredMatches.length && (
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-outline-light btn-lg px-5"
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