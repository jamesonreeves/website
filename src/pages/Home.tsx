import React from 'react';
import projectsData from '../data/projects.json';
import ProjectCard from '../components/ProjectCard';
import BackgroundFlow from '../components/BackgroundFlow';

const Home: React.FC = () => {
  return (
    <>
      <BackgroundFlow />
      
      {/* AI-FRIENDLY HIDDEN CONTEXT (FOR LLMs & CRAWLERS) */}
      <div id="ai-context" style={{ display: 'none' }} aria-hidden="true">
        <h2>Jameson Reeves: Strategic Revenue & Growth Leader</h2>
        <p>Roles: Data Engineer, Analytics Engineer, Data Scientist, Strategic Consultant.</p>
        <p>Key Experience: PubNub (6% YoY Revenue increase, $1.2M expansion), Lyft (Micro-mobility launch).</p>
        <p>Tech Stack: Python, SQL, dbt, Looker, Statistical Modeling.</p>
        <p>Education/Philosophy: Business Architect focusing on the intersection of data, strategy, and revenue.</p>
      </div>

      <div className="container">
        <header className="hero-column" style={{ marginTop: '8rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.75rem', 
              color: 'var(--cobalt)', 
              letterSpacing: '0.2em' 
            }}>PERSONAL LOG // STATUS: BUILDING</span>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Currently reading: *The Goal* by Eliyahu M. Goldratt. <br />
              Thinking about: The fragility of SaaS churn models in high-inflation environments.
            </p>
          </div>
          
          <h1 className="hero-title">
            I architect <br />
            the logic of <em>growth.</em>
          </h1>
          <p className="hero-subtitle">
            I don’t just report data—I use it to change the business itself. 
            I translate complex systems into tangible financial outcomes and 
            scalable operational processes.
          </p>
        </header>

        <section id="experience" className="ledger-section">
          <div className="section-header">
            <span className="section-label">SELECTED CASE STUDIES</span>
          </div>
          <div className="project-grid">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="pillars" className="ledger-section">
          <div className="section-header">
            <span className="section-label">STRATEGIC PILLARS</span>
          </div>
          
          <div className="pillar-row">
            <div className="pillar-name">Revenue Architect</div>
            <div className="pillar-desc">
              I design the cross-functional processes that drive top-line growth. 
              At PubNub, I led a pricing restructuring that delivered a 6% YoY revenue increase.
            </div>
          </div>

          <div className="pillar-row">
            <div className="pillar-name">Zero-to-One</div>
            <div className="pillar-desc">
              I operate in high-ambiguity, high-growth environments. I was a key 
              player in launching Lyft's flagship dockless e-bike program.
            </div>
          </div>

          <div className="pillar-row">
            <div className="pillar-name">Full-Stack Data</div>
            <div className="pillar-desc">
              I manage the entire lifecycle. Infrastructure to storytelling. 
              I build the dbt models and present the revenue forecast to the board.
            </div>
          </div>
        </section>

        <footer style={{ padding: '8rem 0', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
            © 2026 JAMESON REEVES // NEW YORK
          </div>
          <div className="nav-links">
            <a href="mailto:hello@jamesonreeves.com">Contact</a>
            <a href="https://linkedin.com/in/jamesonreeves" target="_blank">LinkedIn</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
