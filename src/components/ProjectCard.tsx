import React, { useState } from 'react';
import RevenueSimulator from './RevenueSimulator';

interface Project {
  id: string;
  title: string;
  description: string;
  insight?: string;
  category: string;
  interactive?: boolean;
  tags?: string[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [showInteractive, setShowInteractive] = useState(false);

  return (
    <article className="project-card" style={{ gridColumn: project.interactive ? 'span 12' : 'auto' }}>
      <div className="project-category">{project.category}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description" style={{ maxWidth: '800px' }}>{project.description}</p>
      
      {project.insight && (
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1.5rem', 
          borderLeft: '2px solid var(--cobalt)',
          backgroundColor: '#f8f9fa',
          maxWidth: '800px'
        }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.65rem', 
            color: 'var(--cobalt)',
            display: 'block',
            marginBottom: '0.5rem'
          }}>PERSPECTIVE // DIRECT INSIGHT</span>
          <p style={{ 
            fontSize: '1rem', 
            fontStyle: 'italic', 
            margin: 0,
            color: 'var(--charcoal)',
            lineHeight: 1.6
          }}>"{project.insight}"</p>
        </div>
      )}

      {project.interactive && (
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => setShowInteractive(!showInteractive)}
            className="accent-button"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            {showInteractive ? 'HIDE SIMULATOR' : 'OPEN INTERACTIVE MODEL'}
          </button>
          
          {showInteractive && <RevenueSimulator />}
        </div>
      )}

      <div style={{ marginTop: '2.5rem' }}>
        {project.tags && project.tags.map(tag => (
          <span key={tag} style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.65rem', 
            marginRight: '1.5rem',
            color: 'var(--cobalt)',
            opacity: 0.8
          }}>// {tag}</span>
        ))}
      </div>
    </article>
  );
};

export default ProjectCard;
