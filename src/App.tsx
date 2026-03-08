import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import siteContent from './data/site-content.json';

const App: React.FC = () => {
  return (
    <div>
      <nav className="container" style={{ border: 'none' }}>
        <Link to="/" className="nav-logo">{siteContent.navigation.logo}</Link>
        <div className="nav-links">
          {siteContent.navigation.links.map((link) => (
            link.isExternal ? (
              <a key={link.label} href={link.path}>{link.label}</a>
            ) : (
              <Link key={link.label} to={link.path}>{link.label}</Link>
            )
          ))}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/apply/:slug" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
