import React from 'react';
import projectsData from '../data/projects.json';
import siteContent from '../data/site-content.json';
import ProjectCard from '../components/ProjectCard';
import BackgroundFlow from '../components/BackgroundFlow';

// HELPER: Convert markdown-like **bold**, *italics*, and ~strikethrough~ 
const formatRichText = (text: string) => {
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

const Projects: React.FC = () => {
  const { archive, footer } = siteContent;

  return (
    <>
      <BackgroundFlow />
      <div className="container" style={{ marginTop: '4rem' }}>
        <header className="hero-column" style={{ marginBottom: '6rem' }}>
          <span className="section-label">{archive.label}</span>
          <h1 className="hero-title" style={{ fontSize: '4rem', fontWeight: 200 }}>
            {formatRichText(archive.title)}
          </h1>
          <p className="hero-subtitle">{archive.subtitle}</p>
        </header>

        <section className="ledger-section" style={{ borderTop: '1px solid var(--charcoal)' }}>
          <div className="project-grid">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <footer style={{ padding: '8rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
            {footer.copyright}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Projects;
