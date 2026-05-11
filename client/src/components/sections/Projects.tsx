import React from 'react';
import { ArrowRight } from 'lucide-react';
import { projectsData, Project } from '../../data/projects';
import ScrollReveal from '../ui/ScrollReveal';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <a href={`/projects#${project.id}`} className="project-card">
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay"></div>
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span className="project-client">{project.client}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-note">{project.prestigeNote}</p>
        <div className="project-cta">
          <span>View case study</span>
          <ArrowRight className="project-cta-icon" />
        </div>
      </div>
    </a>
  );
};

export default function Projects() {
  const topProjects = [...projectsData].sort((a, b) => a.rank - b.rank).slice(0, 3);

  if (topProjects.length < 3) return null;

  return (
    <section id="portfolio" style={{ paddingTop: '0', paddingBottom: 'var(--space-xxl)', backgroundColor: 'var(--color-abyss)' }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ marginBottom: 'var(--space-lg)', maxWidth: '800px' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>
              Selected Landmark Projects
            </span>
            <h2 style={{ marginBottom: '1rem' }}>
              Trusted on UAE’s most demanding pool and water-feature projects
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--color-text-dim)' }}>
              Decades of experience delivering landmark aquatic engineering with specialist execution and uncompromising quality.
            </p>
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          <ScrollReveal delay={0.1} className="project-wrapper">
            <ProjectCard project={topProjects[0]} />
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="project-wrapper">
            <ProjectCard project={topProjects[1]} />
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} className="project-wrapper">
            <ProjectCard project={topProjects[2]} />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.4}>
          <div className="portfolio-cta-strip">
            <div className="portfolio-cta-content">
              <h3>Ready to discuss your project?</h3>
              <p>Explore our complete portfolio or reach out to see how our engineering pedigree can unlock your property's potential.</p>
            </div>
            <div className="portfolio-cta-actions">
              <a href="/projects" className="btn-secondary">View Full Portfolio</a>
              <a href="/contact" className="btn-primary">Request a Quote</a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .projects-grid {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: var(--space-md);
          margin-bottom: var(--space-xl);
          padding-bottom: var(--space-md); /* space for scrollbar */
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
        }
        
        .projects-grid::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        
        @media (min-width: 768px) {
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            overflow-x: visible;
            padding-bottom: 0;
            gap: var(--space-md);
          }
        }
        
        /* The ScrollReveal wrapper */
        .projects-grid > div {
          flex: 0 0 85%;
          scroll-snap-align: start;
        }

        @media (min-width: 768px) {
          .projects-grid > div {
            flex: auto;
          }
        }

        .project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-card);
          overflow: hidden;
          text-decoration: none;
          background: var(--color-deep);
          border: 1px solid var(--color-glass-border);
          transition: var(--transition);
          height: 100%;
          min-height: 400px;
          flex: 1;
        }

        @media (min-width: 1024px) {
          .project-card {
            min-height: 450px;
          }
        }
        
        .project-card:hover {
          border-color: var(--color-gold-dim);
          transform: translateY(-4px);
        }
        .project-image-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .project-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card:hover .project-image-wrapper img {
          transform: scale(1.05);
        }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(3, 13, 26, 1) 0%, rgba(3, 13, 26, 0.8) 40%, rgba(3, 13, 26, 0.4) 100%);
          transition: var(--transition);
        }
        .project-card:hover .project-overlay {
          background: linear-gradient(to top, rgba(3, 13, 26, 1) 0%, rgba(3, 13, 26, 0.85) 50%, rgba(3, 13, 26, 0.5) 100%);
        }
        .project-content {
          position: relative;
          z-index: 2;
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          flex: 1;
        }
        .project-meta {
          display: flex;
          gap: 10px;
          margin-bottom: 12px;
        }
        .project-client {
          color: var(--color-gold);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
        }
        .project-title {
          color: var(--color-foam);
          font-size: clamp(24px, 3vw, 32px);
          margin-bottom: 8px;
          font-weight: 600;
          line-height: 1.1;
          font-family: var(--font-display);
        }
        .project-note {
          color: var(--color-text-dim);
          font-size: 15px;
          margin-bottom: 24px;
          max-width: 90%;
        }
        .project-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-aqua);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.8;
          transition: var(--transition);
        }
        .project-cta-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }
        .project-card:hover .project-cta {
          opacity: 1;
          color: var(--color-gold);
        }
        .project-card:hover .project-cta-icon {
          transform: translateX(4px);
        }

        .portfolio-cta-strip {
          background: var(--color-glass);
          border: 1px solid var(--color-glass-border);
          border-radius: var(--radius-card);
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .portfolio-cta-strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 100% 50%, rgba(0,180,216,0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        @media (min-width: 768px) {
          .portfolio-cta-strip {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            padding: var(--space-xl) var(--space-lg);
          }
        }
        .portfolio-cta-content {
          position: relative;
          z-index: 1;
        }
        .portfolio-cta-content h3 {
          font-size: clamp(24px, 3vw, 32px);
          color: var(--color-foam);
          margin-bottom: 8px;
        }
        .portfolio-cta-content p {
          color: var(--color-text-dim);
          font-size: 16px;
          max-width: 500px;
        }
        .portfolio-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px) {
          .portfolio-cta-actions {
            flex-direction: row;
            width: auto;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
