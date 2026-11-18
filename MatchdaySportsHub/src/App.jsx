import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import FixturesPage from './pages/FixturesPage';
import MatchDetailsPage from './pages/MatchDetailsPage';
import StandingsPage from './pages/StandingsPage';
import PredictionsPage from './pages/PredictionsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <FavoritesProvider>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />

        <main className="container my-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<FixturesPage />} />
            <Route path="/matches/:id" element={<MatchDetailsPage />} />
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

        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;