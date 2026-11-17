import { NavLink, Link } from 'react-router-dom';

function NavBar() {
  const navLinkClass = ({ isActive }) =>
    `nav-link px-3 ${isActive ? 'active text-info fw-bold' : 'text-light'}`;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark border-bottom border-secondary sticky-top"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(12px)' }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <i className="bi bi-trophy-fill text-info"></i>
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;