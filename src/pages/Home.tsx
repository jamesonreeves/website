import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import siteContent from '../data/site-content.json';
import ProjectCard from '../components/ProjectCard';
import BackgroundFlow from '../components/BackgroundFlow';

// HELPER: Convert markdown-like **bold**, *italics*, and ~strikethrough~ 
const formatRichText = (text: string) => {
  // Regex to split by **bold**, *italics*, and ~strikethrough~
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|~[^~]+~)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} style={{ fontStyle: 'italic', color: 'var(--cobalt)' }}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('~') && part.endsWith('~')) {
      return (
        <span key={i} style={{ 
          textDecoration: 'line-through', 
          opacity: 0.3, 
          color: 'var(--cobalt)',
          marginRight: '0.4rem',
          fontSize: '0.85em',
          fontWeight: 200
        }}>
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};

const Home: React.FC = () => {
  const featuredProjects = projectsData.slice(0, 5);
  const { home, footer } = siteContent;

  return (
    <>
      <BackgroundFlow />
      
      <div id="ai-context" style={{ display: 'none' }} aria-hidden="true">
        <h2>{home.aiContext.name}</h2>
        <p>Roles: {home.aiContext.roles}</p>
        <p>Key Experience: {home.aiContext.experience}</p>
        <p>Tech Stack: {home.aiContext.tech}</p>
        <p>Education/Philosophy: {home.aiContext.philosophy}</p>
      </div>

      <div className="container">
        <header className="hero-column" style={{ marginTop: '8rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.75rem', 
              color: 'var(--cobalt)', 
              letterSpacing: '0.2em' 
            }}>{home.status.label}</span>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {home.status.reading} <br />
              {home.status.thinking}
            </p>
          </div>
          
          <h1 className="hero-title" style={{ marginBottom: '1.5rem', fontWeight: 200 }}>
            {formatRichText(home.hero.title)}
          </h1>
          <p className="hero-definition">
            {home.hero.definition}
          </p>
          <p className="hero-subtitle">{home.hero.subtitle}</p>
        </header>

        <section id="experience" className="ledger-section">
          <div className="section-header">
            <span className="section-label">SELECTED CASE STUDIES</span>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            <Link to="/projects" className="project-card see-more-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center',
              textDecoration: 'none',
              border: '1px dashed var(--border-subtle)',
              backgroundColor: 'rgba(0, 71, 171, 0.02)',
              minHeight: '400px'
            }}>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                color: 'var(--cobalt)',
                marginBottom: '1rem'
              }}>+ {projectsData.length - 5} MORE PROJECTS</span>
              <h3 className="project-title" style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                View Full <br />Archive
              </h3>
              <div style={{ 
                marginTop: '2rem', 
                padding: '0.5rem 1rem', 
                border: '1px solid var(--cobalt)',
                color: 'var(--cobalt)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem'
              }}>ENTER LOGS //</div>
            </Link>
          </div>
        </section>

        <footer style={{ padding: '8rem 0', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
            {footer.copyright}
          </div>
          <div className="nav-links">
            {footer.social.map((link) => (
              <a key={link.label} href={link.url} target={link.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
