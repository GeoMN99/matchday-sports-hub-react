import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import FixturesPage from './pages/FixturesPage';
import StandingsPage from './pages/StandingsPage';
import PredictionsPage from './pages/PredictionsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<FixturesPage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/predictions" element={<PredictionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="*"
            element={
              <div className="text-center py-5">
                <h2 className="text-warning fw-bold">404 - Page Not Found</h2>
                <p className="text-white-50">The route you requested does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="text-center py-4 border-top border-secondary text-white-50 mt-auto">
        <div className="container">
          <p className="mb-0 small">
            Matchday Sports Hub &copy; 2026 | Built with ❤
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;