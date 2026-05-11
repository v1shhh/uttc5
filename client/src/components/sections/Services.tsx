import React from "react";
import ScrollReveal from "../ui/ScrollReveal";

export default function Services() {
  const services = [
    {
      num: "01",
      title: "Swimming Pools",
      desc: "Commercial, residential, hospitality, and specialist pools — including animal pools for horses and camels. From excavation to the first splash, we handle every stage in-house. Your pool should be the highlight of your property, not a liability.",
      large: true,
    },
    {
      num: "02",
      title: "Water Features & Fountains",
      desc: "Musical fountains, fire-and-water features, dry-deck dancing fountains, laminar jets, waterfalls, and water walls. We built the Diving Men. We know what it takes to make water move people.",
      large: true,
    },
    {
      num: "03",
      title: "Hard & Soft Landscaping",
      desc: "Complete outdoor environments — decking, irrigation, pergolas, \nBBQ stations, landscape lighting. Every element designed to frame your water feature perfectly.",
      large: false,
    },
    {
      num: "04",
      title: "Maintenance & Chemistry",
      desc: "Sparkling water guaranteed. We manage pH, chlorine, algae, bacteria, and equipment — for pools, lakes, koi ponds, and features of any scale.",
      large: false,
    },
    {
      num: "05",
      title: "Refurbishment & Leak Repair",
      desc: "Infinity edge conversions, retiling, waterproofing, depth changes, jet upgrades. If it's leaking and you don't know why — we find it.",
      large: false,
    },
    {
      num: "06",
      title: "Trading & Supply",
      desc: "World-class pool and water feature products shipped across the UAE, GCC, and beyond. Bulk discounts for contractors and developers.",
      large: false,
    },
  ];

  return (
    <section
      id="services"
      style={{
        padding: "var(--space-xxl) 0",
        backgroundColor: "var(--color-abyss)",
      }}
    >
      <div className="container">
        <ScrollReveal>
          <div style={{ marginBottom: "var(--space-lg)" }}>
            <span
              className="eyebrow"
              style={{ display: "block", marginBottom: "1rem" }}
            >
              What We Build, Design & Maintain
            </span>
            <h2>Every Water Experience. Every Scale.</h2>
          </div>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((svc, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`service-card ${svc.large ? "large" : "small"}`}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div className="service-icon">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12A10 10 0 0 1 22 12c0 5-5 10-10 10S2 17 2 12z"></path>
                      <path d="M22 12c-5 0-5-4-10-4s-5 4-10 4"></path>
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-impact)",
                      fontSize: "16px",
                      color: "var(--color-text-dim)",
                      letterSpacing: "2px",
                    }}
                  >
                    {svc.num}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--color-foam)",
                    marginBottom: "1rem",
                    textTransform: "none",
                    letterSpacing: 0,
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text)",
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {svc.desc}
                </p>
                <a
                  href="#contact"
                  className="service-link"
                  data-analytics={`service_${svc.num}`}
                >
                  Explore →
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <a
              href="/specialisms"
              className="btn-secondary"
              data-analytics="view_full_specialisms_list"
            >
              See Full List of Expertise →
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-md);
        }
        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .services-grid > div:nth-child(1),
          .services-grid > div:nth-child(2) {
            grid-column: span 2;
          }
        }
        .service-card {
          background: var(--color-glass);
          border: 1px solid var(--color-glass-border);
          border-radius: var(--radius-card);
          padding: var(--space-md);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        .service-card .service-icon {
          color: var(--color-aqua);
          transition: var(--transition);
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 0 1.5px var(--color-aqua);
          background: rgba(255,255,255,0.06);
        }
        .service-card:hover .service-icon {
          transform: scale(1.1);
        }
        .service-link {
          color: var(--color-gold);
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateY(10px);
          transition: var(--transition);
        }
        .service-card:hover .service-link {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
