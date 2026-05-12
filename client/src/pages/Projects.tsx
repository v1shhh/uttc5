import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { projectsData, Project } from '../data/projects';
import { SEO } from '../components/ui/SEO';
import ScrollReveal from '../components/ui/ScrollReveal';
import Navbar from '../components/layout/Navbar';

const Footer = lazy(() => import('../components/layout/Footer'));

const ProjectCard = ({ project, variant = 'standard' }: { project: Project, variant?: 'hero' | 'featured' | 'standard' }) => {
  if (variant === 'hero') {
    return (
      <div id={project.id} className="project-card hero-card">
        <div className="hero-card-image">
          <img 
            src={project.image} 
            alt={project.title} 
            loading="lazy"
          />
          <div className="overlay-gradient" />
        </div>
        <div className="hero-card-content">
          <span className="eyebrow card-tag">{project.tag}</span>
          <h2 className="card-title">{project.title}</h2>
          
          <div className="card-meta">
            <div className="meta-item">
               <span className="meta-label">Client</span>
               <span className="meta-value">{project.client}</span>
            </div>
            {project.contractor && (
              <div className="meta-item">
                 <span className="meta-label">Contractor</span>
                 <span className="meta-value">{project.contractor}</span>
              </div>
            )}
            <div className="meta-item">
               <span className="meta-label">Type</span>
               <span className="meta-value">{project.projectType || 'Aquatic Engineering'}</span>
            </div>
          </div>

          <p className="card-description">
            {project.description}
          </p>

          <div className="prestige-badge">
            <ShieldCheck className="badge-icon" />
            <span>{project.prestigeNote}</span>
          </div>

          <a href={`/contact?interest=${project.id}`} className="btn-secondary card-btn">
            Discuss Similar Project
          </a>
        </div>
      </div>
    );
  }

  return (
    <div id={project.id} className={`project-card ${variant}-card`}>
      <div className="card-image-wrapper">
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
        />
        <div className="overlay-gradient" />
      </div>
      
      <div className="card-content">
        <span className="eyebrow text-gold mb-sm">{project.tag}</span>
        <h3 className="card-title-small">{project.title}</h3>
        
        <div className="card-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Client</span>
            <span className="meta-value truncate">{project.client}</span>
          </div>
          <div className="meta-item">
             <span className="meta-label">Type</span>
             <span className="meta-value truncate">{project.projectType || 'Engineering'}</span>
          </div>
        </div>

        <p className="card-description flex-grow">
          {project.description}
        </p>

        <div className="card-footer">
          <span className="prestige-text truncate">{project.prestigeNote}</span>
          <a href={`/contact?interest=${project.id}`} className="discuss-action" title="Discuss Project">
            <MessageSquare className="action-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sortedProjects = [...projectsData].sort((a, b) => a.rank - b.rank);
  const heroProjects = sortedProjects.slice(0, 3);
  const featuredProjects = sortedProjects.slice(3, 9);
  const standardProjects = sortedProjects.slice(9);

  return (
    <>
      <SEO 
        title="Project Portfolio | Landmark Pools & Water Features in UAE" 
        description="Explore our complete portfolio covering UAE's most prestigious aquatic engineering projects, including Burj Al Arab, Emirates Palace, and The Dubai Mall."
      />
      <Navbar />
      
      <div className="portfolio-page">

        <ScrollReveal>
          <div className="page-header-wrapper">
            <div className="page-header-bg">
              {projectsData
                .filter(project => project.image.includes('unsplash.com'))
                .slice(0, 6)
                .map((project, index) => (
                <div
                  key={project.id}
                  className="bg-image"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    animationDelay: `${index * 5}s`
                  }}
                />
              ))}
            </div>
            <div className="container" style={{ paddingTop: '140px' }}>
              <div className="page-header" style={{ paddingBottom: 'var(--space-xxl)' }}>
                <span className="eyebrow" style={{ display: 'block', marginBottom: 'var(--space-md)' }}>
                  Comprehensive Portfolio
                </span>
                <h1 className="page-title text-gold">
                  Engineering <br/>Landmarks
                </h1>
                <p className="page-subtitle text-dim">
                  A legacy of uncompromising quality across the UAE's most demanding hospitality, commercial, and residential developments. These are the projects that define our engineering pedigree.
                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            <AnimatePresence>
              {showScrollIndicator && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 1.5
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.5, 
                    y: 20,
                    transition: { duration: 0.15 }
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const heroSection = document.querySelector('.hero-section');
                    if (heroSection) {
                      heroSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' });
                    }
                  }}
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 20px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: '#030d1a' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        <div className="container">

          {/* Top Tier (Hero Cards) */}
          <div className="hero-section">
            <ScrollReveal>
              <h2 className="section-label">Apex Developments</h2>
            </ScrollReveal>
            <div className="hero-grid">
              {heroProjects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <ProjectCard project={project} variant="hero" />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Mid Tier (2 Column Grid) */}
          <div className="featured-section pt-xl pb-xl">
            <ScrollReveal>
              <h2 className="section-label">Signature Profiles</h2>
            </ScrollReveal>
            <div className="featured-grid">
              {featuredProjects.map((project, index) => (
                <ScrollReveal key={project.id} delay={(index % 2) * 0.1} className="h-full">
                  <ProjectCard project={project} variant="featured" />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Banner CTA */}
          <ScrollReveal>
             <div className="cta-banner glass-card">
                <div className="cta-banner-content">
                  <h3>Planning a landmark of your own?</h3>
                  <p>Partner with the engineering team trusted by Jumeirah, Emaar, and Kempinski.</p>
                </div>
                <div className="cta-banner-actions">
                  <a href="/contact" className="btn-primary">
                    Request a Quote <ArrowRight style={{ width: '18px', marginLeft: '8px' }} />
                  </a>
                </div>
             </div>
          </ScrollReveal>

          {/* Standard Tier (3 Column Grid) */}
          <div className="standard-section pt-xl pb-xxl">
            <ScrollReveal>
              <h2 className="section-label">Selected Works</h2>
            </ScrollReveal>
            <div className="standard-grid">
              {standardProjects.map((project, index) => (
                <ScrollReveal key={project.id} delay={(index % 3) * 0.1} className="h-full">
                  <ProjectCard project={project} variant="standard" />
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <style>{`
        .portfolio-page {
          background-color: var(--color-abyss);
          color: var(--color-foam);
          padding-top: 0;
          min-height: 100vh;
          overflow-x: hidden;
          width: 100%;
        }

        .portfolio-page .container {
          max-width: 100%;
          overflow-x: hidden;
        }

        .text-gold { color: var(--color-gold); }
        .text-dim { color: var(--color-text-dim); }
        .mb-sm { margin-bottom: var(--space-sm); }
        .pt-xl { padding-top: var(--space-xl); }
        .pb-xl { padding-bottom: var(--space-xl); }
        .pb-xxl { padding-bottom: var(--space-xxl); }
        .h-full { height: 100%; display: flex; }

        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .page-header-wrapper {
          position: relative;
          margin-bottom: var(--space-lg);
          width: 100vw;
          min-height: auto;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .page-header-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          animation: imageFade 30s infinite;
        }

        .bg-image:nth-child(1) { animation-delay: 0s; }
        .bg-image:nth-child(2) { animation-delay: 5s; }
        .bg-image:nth-child(3) { animation-delay: 10s; }
        .bg-image:nth-child(4) { animation-delay: 15s; }
        .bg-image:nth-child(5) { animation-delay: 20s; }
        .bg-image:nth-child(6) { animation-delay: 25s; }

        @keyframes imageFade {
          0%, 16.67%, 100% { opacity: 0; }
          3%, 13.67% { opacity: 1; }
        }

        .page-header-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(3, 13, 26, 0.3) 0%,
            rgba(3, 13, 26, 0.7) 50%,
            rgba(3, 13, 26, 0.95) 85%,
            rgba(3, 13, 26, 1) 100%
          );
          backdrop-filter: blur(8px) saturate(150%);
          -webkit-backdrop-filter: blur(8px) saturate(150%);
          z-index: 1;
        }

        .page-header {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: var(--space-xl) var(--space-lg) var(--space-xl) 0;
        }

        @media (min-width: 768px) {
          .page-header {
            padding: var(--space-xl) var(--space-xl) var(--space-xl) 0;
          }
        }

        .page-title {
          font-size: clamp(3rem, 6vw, 5rem);
          margin-bottom: var(--space-md);
          line-height: 1;
          color: var(--color-foam);
          font-style: normal;
        }

        .page-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          color: var(--color-text-dim);
          max-width: 800px;
        }

        .section-label {
          font-size: 1.5rem;
          color: var(--color-foam);
          margin-bottom: var(--space-lg);
          padding-left: 1rem;
          border-left: 2px solid var(--color-gold-dim);
          font-family: var(--font-body);
          font-weight: 500;
        }

        /* Hero Cards */
        .hero-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          width: 100%;
          max-width: 100%;
        }

        .project-card {
          position: relative;
          background: var(--color-deep);
          border: 1px solid var(--color-glass-border);
          border-radius: var(--radius-card);
          overflow: hidden;
          display: flex;
          transition: var(--transition);
          max-width: 100%;
        }

        .hero-card {
          flex-direction: column;
          min-height: auto;
        }

        @media (min-width: 1024px) {
          .hero-card {
            flex-direction: row;
            height: 500px;
          }
          .hero-card:nth-child(even) {
            flex-direction: row-reverse;
          }
        }

        .hero-card-image {
          position: relative;
          flex: 1;
          height: 350px;
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .hero-card-image {
            height: 100%;
            flex: 1.2;
          }
        }

        .hero-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .hero-card-image img {
          transform: scale(1.05);
        }

        .overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(3, 13, 26, 1) 0%, rgba(3, 13, 26, 0.4) 50%, transparent 100%);
          transition: var(--transition);
        }

        @media (min-width: 1024px) {
          .hero-card .overlay-gradient {
            background: linear-gradient(to right, rgba(3, 13, 26, 0) 0%, rgba(3, 13, 26, 0.9) 80%, rgba(3, 13, 26, 1) 100%);
          }
          .hero-card:nth-child(even) .overlay-gradient {
            background: linear-gradient(to left, rgba(3, 13, 26, 0) 0%, rgba(3, 13, 26, 0.9) 80%, rgba(3, 13, 26, 1) 100%);
          }
        }

        .hero-card-content {
          flex: 1;
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 2;
          background: var(--color-abyss);
        }

        @media (min-width: 1024px) {
          .hero-card-content {
            padding: calc(var(--space-xl) * 1.5);
            background: transparent;
          }
        }

        .card-tag {
          color: var(--color-aqua);
          margin-bottom: var(--space-sm);
          display: inline-block;
        }

        .card-title {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: var(--space-md);
          color: var(--color-foam);
          line-height: 1.1;
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }

        @media (min-width: 640px) {
          .card-meta {
            flex-direction: row;
            flex-wrap: wrap;
            gap: var(--space-md);
          }
        }

        .meta-item {
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-text-dim);
          font-weight: 600;
          margin-bottom: 2px;
        }

        .meta-value {
          font-size: 14px;
          color: var(--color-text);
          font-weight: 500;
        }

        .card-description {
          font-size: 15px;
          color: var(--color-text-dim);
          line-height: 1.6;
          margin-bottom: var(--space-md);
        }

        .prestige-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--color-deep);
          border: 1px solid var(--color-glass-border);
          border-radius: var(--radius-card);
          margin-bottom: var(--space-md);
          font-size: 14px;
          color: var(--color-foam);
          font-weight: 500;
        }

        .badge-icon {
          color: var(--color-gold);
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .card-btn {
          align-self: flex-start;
          margin-top: auto;
        }

        /* Featured & Standard Cards */
        .featured-grid, .standard-grid {
          display: grid;
          gap: var(--space-md);
          width: 100%;
          max-width: 100%;
        }

        .featured-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .featured-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .standard-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .standard-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .standard-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .featured-card, .standard-card {
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        .featured-card:hover, .standard-card:hover {
          border-color: var(--color-gold-dim);
          transform: translateY(-4px);
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
        }

        .featured-card .card-image-wrapper {
          height: 320px;
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card:hover .card-image-wrapper img {
          transform: scale(1.05);
        }

        .card-content {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title-small {
          font-size: 1.5rem;
          margin-bottom: var(--space-sm);
          color: var(--color-foam);
          line-height: 1.2;
        }

        .featured-card .card-title-small {
          font-size: 1.8rem;
        }

        .card-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
          padding-bottom: var(--space-sm);
          border-bottom: 1px solid var(--color-glass-border);
        }

        .flex-grow {
          flex-grow: 1;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-sm);
          margin-top: auto;
          border-top: 1px solid var(--color-glass-border);
        }

        .prestige-text {
          font-size: 12px;
          color: var(--color-gold);
          font-weight: 500;
          max-width: 80%;
        }

        .discuss-action {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-glass);
          border-radius: 4px;
          color: var(--color-aqua);
          transition: var(--transition);
        }

        .discuss-action:hover {
          background: var(--color-aqua);
          color: var(--color-abyss);
          transform: translateY(-2px);
        }

        .action-icon {
          width: 16px;
          height: 16px;
        }

        /* Banner CTA */
        .cta-banner {
          margin: var(--space-xl) 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          gap: var(--space-md);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 100%, rgba(0,180,216,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .cta-banner {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            padding: var(--space-xl);
          }
        }

        .cta-banner-content h3 {
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 8px;
        }

        .cta-banner-content p {
          color: var(--color-text-dim);
          font-size: 1.1rem;
          max-width: 500px;
        }
      `}</style>
    </>
  );
}
