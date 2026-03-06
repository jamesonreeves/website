import React from 'react';
import { useParams, Link } from 'react-router-dom';
import landingPagesData from '../data/landing-pages.json';
import projectsData from '../data/projects.json';
import ProjectCard from '../components/ProjectCard';
import BackgroundFlow from '../components/BackgroundFlow';

const LandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = landingPagesData.find((p) => p.slug === slug);

  if (!page) {
    return (
      <div className="container">
        <h1 className="hero-title">404.</h1>
        <p>Strategic Brief not found.</p>
        <Link to="/" className="accent-button">Return Home</Link>
      </div>
    );
  }

  const featuredProjects = projectsData.filter((project) =>
    page.featuredProjectIds.includes(project.id)
  );

  return (
    <>
      <BackgroundFlow />
      <div className="container">
        <header className="hero-column" style={{ marginTop: '8rem' }}>
          <span className="section-label">STRATEGIC BRIEF // {page.company.toUpperCase()}</span>
          <h1 className="hero-title" style={{ marginTop: '2rem' }}>
            Hi <em>{page.company}.</em>
          </h1>
          <p className="hero-subtitle">
            {page.intro}
          </p>
        </header>

        <section className="ledger-section">
          <div className="section-header">
            <span className="section-label">RELEVANT CASE STUDIES</span>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section className="ledger-section" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8rem' }}>
          <div className="section-header">
            <span className="section-label">THE PROPOSAL</span>
          </div>
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '2rem', fontWeight: 200 }}>
              Let’s architect the next <br /> phase of growth.
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', fontWeight: 300 }}>
              I’m ready to translate your data into strategic leverage. Let’s discuss how my 
              experience at PubNub and Lyft can drive revenue and innovation for your team.
            </p>
            <a href="mailto:hello@jamesonreeves.com" className="accent-button">
              Initiate Contact
            </a>
          </div>
        </section>

        <footer style={{ padding: '8rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
            © 2026 JAMESON REEVES // {page.company.toUpperCase()} BRIEF
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
