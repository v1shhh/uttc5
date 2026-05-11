import React, { Suspense, lazy } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import TrustBar from "../components/sections/TrustBar";
import ProblemSolver from "../components/sections/ProblemSolver";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import StickyCallBar from "../components/ui/StickyCallBar";
import { SEO } from "../components/ui/SEO";

// Lazy load below-the-fold sections
const SocialProof = lazy(() => import("../components/sections/SocialProof"));
const Specialisms = lazy(() => import("../components/sections/Specialisms"));
const About = lazy(() => import("../components/sections/About"));
const Faq = lazy(() => import("../components/sections/Faq"));
const LeadMagnet = lazy(() => import("../components/sections/LeadMagnet"));
const ContactCTA = lazy(() => import("../components/sections/ContactCTA"));
const Footer = lazy(() => import("../components/layout/Footer"));

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "United Technology & Trading Co. (UTTC)",
    "image": "https://uttc.ae/og-image.jpg",
    "description": "UAE's most trusted water works authority. Serving the region since 1976 with commercial and residential water solutions.",
    "url": "https://uttc.ae",
    "telephone": "+971501234567",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    }
  };

  return (
    <>
      <SEO 
        title="UAE's Premier Water Works Authority Since 1976" 
        description="UTTC specializes in commercial and residential swimming pools, water features, treatment plants, and pumping stations across the UAE."
        canonicalUrl="https://uttc.ae/"
        structuredData={localBusinessSchema}
      />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolver />
        <Services />
        <Projects />
        <Suspense fallback={<div className="py-20 text-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin border-opacity-50 mx-auto"></div></div>}>
          <About />
          <LeadMagnet />
          <ContactCTA />
          <Faq />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <StickyCallBar />
    </>
  );
}
