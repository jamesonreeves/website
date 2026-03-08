import React, { useState } from 'react';
import RevenueSimulator from './RevenueSimulator';

interface Project {
  id: string;
  title: string;
  description: string;
  full_description?: string;
  insight?: string;
  category: string;
  interactive?: boolean;
  tags?: string[];
  image?: string;
  gallery?: string[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [showInteractive, setShowInteractive] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <article className="project-card">
      {project.image && (
        <div className="project-image-container">
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
          />
        </div>
      )}

      <div className="project-category">{project.category}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">
        {showFullDescription ? project.full_description : project.description}
      </p>

      {showFullDescription && project.gallery && project.gallery.length > 1 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '1rem', 
          marginTop: '2rem',
          marginBottom: '2rem' 
        }}>
          {project.gallery.slice(1).map((img, i) => (
            <img 
              key={i} 
              src={img} 
              alt={`${project.title} gallery ${i}`} 
              style={{ width: '100%', height: 'auto', border: '1px solid var(--border-subtle)' }}
            />
          ))}
        </div>
      )}

      {project.full_description && (
        <button 
          onClick={() => setShowFullDescription(!showFullDescription)}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--cobalt)', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.65rem', 
            cursor: 'pointer',
            padding: 0,
            marginTop: '0.5rem',
            textAlign: 'left'
          }}
        >
          {showFullDescription ? '// COLLAPSE' : '// READ FULL CASE STUDY'}
        </button>
      )}

      {project.insight && (
        <div className="insight-box">
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.6rem', 
            color: 'var(--cobalt)',
            display: 'block',
            marginBottom: '0.5rem',
            letterSpacing: '0.1em'
          }}>PERSPECTIVE // DIRECT INSIGHT</span>
          <p style={{ 
            fontSize: '1rem', 
            fontStyle: 'italic', 
            margin: 0,
            color: 'var(--charcoal)',
            lineHeight: 1.5
          }}>"{project.insight}"</p>
        </div>
      )}

      {project.interactive && (
        <div style={{ marginTop: '1.5rem' }}>
          <button 
            onClick={() => setShowInteractive(!showInteractive)}
            className="accent-button"
            style={{ cursor: 'pointer', border: 'none', width: '100%' }}
          >
            {showInteractive ? 'HIDE SIMULATOR' : 'OPEN INTERACTIVE MODEL'}
          </button>
          
          {showInteractive && (
            <div style={{ marginTop: '2rem' }}>
              <RevenueSimulator />
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        {project.tags && project.tags.map(tag => (
          <span key={tag} style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.6rem', 
            marginRight: '1rem',
            color: 'var(--cobalt)',
            opacity: 0.7
          }}>// {tag}</span>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
