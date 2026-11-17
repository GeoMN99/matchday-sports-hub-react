import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="col-lg-9 mx-auto">
      <div className="card glass-card text-white p-4 p-md-5 shadow">
        <span className="badge  bg-info-subtle text-info border border-info align-self-start px-3 rounded-pill mb-3">
          About the Platform
        </span>
        <h2 className="fw-bold mb-3">Matchday Sports Hub</h2>
        <p className="text-white-50 lead mb-4">
          Track European football fixtures, check league tables standings and predict scorelines.
        </p>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="p-3 rounded border border-secondary h-100">
              <i className="bi bi-funnel-fill text-info fs-4 mb-2 d-block"></i>
              <h6 className="fw-bold">Real time Filtering</h6>
              <p className="small text-white-50 mb-0">
                Search clubs instantly and filter fixtures by league or full-time/upcoming status.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded border border-secondary h-100">
              <i className="bi bi-table text-warning fs-4 mb-2 d-block"></i>
              <h6 className="fw-bold">League Tables</h6>
              <p className="small text-white-50 mb-0">
                Compare points, wins, draws, losses and goal differences across europe's top-five leagues.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded border border-secondary h-100">
              <i className="bi bi-lightning-charge-fill text-primary fs-4 mb-2 d-block"></i>
              <h6 className="fw-bold">Predictions</h6>
              <p className="small text-white-50 mb-0">
                Submit, edit or delete score predictions.
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 flex-wrap">
          <Link to="/" className="btn btn-primary px-4">
            Explore Fixtures
          </Link>
          <Link to="/predictions" className="btn btn-outline-info px-4">
          Make a Prediction
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;