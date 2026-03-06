import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  return (
    <div>
      <nav className="container" style={{ border: 'none' }}>
        <Link to="/" className="nav-logo">JR.</Link>
        <div className="nav-links">
          <Link to="/">HOME</Link>
          <a href="https://jamesonreeves.com" target="_blank" rel="noopener noreferrer">PORTFOLIO</a>
          <a href="mailto:hello@jamesonreeves.com">CONTACT</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply/:slug" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
