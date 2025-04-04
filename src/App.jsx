
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultSection from './components/ResultSection';
import MintResultSection from './components/MintResultSection';
import Leaderboard from './pages/Leaderboard';
import History from './pages/History';
import Stats from './pages/Stats'; // Import the Stats page
import { useAptosWallet } from './AptosWalletContext';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [authResult, setAuthResult] = useState(null);
  const [mintResult, setMintResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/'); // State to track active route
  const [preview, setPreview] = useState(null);

  const { account, isConnected, connectWallet, disconnectWallet } = useAptosWallet();

  const handleRouteChange = (route) => {
    setActiveRoute(route);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <nav>
          <Link
            to="/"
            className={activeRoute === '/' ? 'active' : ''}
            onClick={() => handleRouteChange('/')}
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className={activeRoute === '/leaderboard' ? 'active' : ''}
            onClick={() => handleRouteChange('/leaderboard')}
          >
            Leaderboard
          </Link>
          <Link
            to="/history"
            className={activeRoute === '/history' ? 'active' : ''}
            onClick={() => handleRouteChange('/history')}
          >
            History
          </Link>
          <Link
            to="/stats"
            className={activeRoute === '/stats' ? 'active' : ''}
            onClick={() => handleRouteChange('/stats')}
          >
            Stats
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="content">
                <UploadSection
                  uploadedImage={uploadedImage}
                  setUploadedImage={setUploadedImage}
                  setLoading={setLoading}
                  setAuthResult={setAuthResult}
                  preview={preview}
                  setPreview={setPreview}
                />
                {preview && (
                  <div className="result-container">
                    {(loading || authResult) && (
                      <ResultSection
                        loading={loading}
                        setLoading={setLoading}
                        uploadedImage={uploadedImage}
                        setAuthResult={setAuthResult}
                        authResult={authResult}
                        setMintResult={setMintResult}
                      />
                    )}
                    {preview && mintResult && <MintResultSection mintResult={mintResult} />}
                  </div>
                )}
              </div>
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;