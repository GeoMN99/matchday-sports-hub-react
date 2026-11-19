import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

function NavBar() {
  const { favoriteIds } = useContext(FavoritesContext);

  const navLinkClass = ({ isActive }) =>
    `nav-link px-3 ${isActive ? 'active text-success fw-bold' : 'text-light'}`;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark border-bottom border-secondary sticky-top"
      style={{ backgroundColor: 'rgba(11, 15, 20, 0.92)', backdropFilter: 'blur(12px)' }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-trophy-fill text-success"></i>
          <span>Matchday Sports Hub</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass}>
                Fixtures
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/standings" className={navLinkClass}>
                Standings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/predictions" className={navLinkClass}>
                Predictions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <span className="badge bg-warning text-dark">
                <i className="bi bi-star-fill me-1"></i>
                Saved: {favoriteIds.length}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;