import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';

const LEAGUES = [
  { id: '4328', name: 'Premier League' },
  { id: '4335', name: 'La Liga' },
  { id: '4331', name: 'Bundesliga' },
  { id: '4332', name: 'Serie A' },
  { id: '4480', name: 'UEFA Champions League' },
];

function StandingsPage() {
  const { data: standings, loading, error } = useFetch('http://localhost:3001/standings');
  const [selectedLeague, setSelectedLeague] = useState('4328');

  const tableRows = standings?.[selectedLeague] || [];

  return (
    <div>
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">League Standings</h2>
          <p className="text-white-50 mb-0">
            Select a competition to check current points, goal difference and form.
          </p>
        </div>

        <div className="col-md-4">
          <label htmlFor="standings-league" className="form-label small text-info fw-semibold">
            Competition
          </label>
          <select
            id="standings-league"
            className="form-select bg-dark text-white border-secondary"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            {LEAGUES.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading standings...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error} — Ensure <code>npm run server</code> is running on port 3001.
        </div>
      )}

      {!loading && !error && (
        <div className="card glass-card text-white shadow overflow-hidden">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr className="text-info small text-uppercase">
                  <th scope="col" className="ps-4">#</th>
                  <th scope="col">Club</th>
                  <th scope="col" className="text-center">MP</th>
                  <th scope="col" className="text-center">W</th>
                  <th scope="col" className="text-center">D</th>
                  <th scope="col" className="text-center">L</th>
                  <th scope="col" className="text-center">GD</th>
                  <th scope="col" className="text-center pe-4">Pts</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.team}>
                    <td className="ps-4">
                      <span
                        className={`badge ${
                          row.rank === 1
                            ? 'bg-info text-dark'
                            : row.rank <= 4
                            ? 'bg-primary'
                            : 'bg-secondary'
                        }`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="fw-semibold">{row.team}</td>
                    <td className="text-center">{row.played}</td>
                    <td className="text-center">{row.won}</td>
                    <td className="text-center">{row.draw}</td>
                    <td className="text-center">{row.loss}</td>
                    <td className="text-center text-white-50">{row.gd}</td>
                    <td className="text-center fw-bold text-info pe-4">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StandingsPage;