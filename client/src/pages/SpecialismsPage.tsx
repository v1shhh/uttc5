import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Specialisms from "../components/sections/Specialisms";
import Footer from "../components/layout/Footer";
import StickyCallBar from "../components/ui/StickyCallBar";
import { trackEvent } from "../hooks/useAnalytics";
import { SEO } from "../components/ui/SEO";

export default function SpecialismsPage() {
  useEffect(() => {
    trackEvent("page_view", "specialisms_page");
  }, []);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Water Engineering, Pools, and Electromechanical Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "UTTC"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Arab Emirates"
    }
  };

  return (
    <>
      <SEO 
        title="Our Technical Specialisms & Services"
        description="Explore UTTC's exhaustive list of engineering capabilities: Commercial Pools, Water Features, Desalination, Pumping Stations, and more."
        canonicalUrl="https://uttc.ae/specialisms"
        structuredData={serviceSchema}
      />
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <Specialisms />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  );
}
