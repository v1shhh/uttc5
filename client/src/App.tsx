import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useAnalyticsLogger } from "./hooks/useAnalytics";

import { ContentProvider } from "./hooks/useContent";
import { ExperimentProvider } from "./hooks/useExperiment";

// Eager load Home for immediately visible content
import Home from "./pages/Home";

// Lazy load secondary pages
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const SpecialismsPage = lazy(() => import("./pages/SpecialismsPage"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const LocationDetails = lazy(() => import("./pages/Location"));

// Lazy load Admin section
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const LeadsTable = lazy(() => import("./components/admin/LeadsTable"));
const Analytics = lazy(() => import("./components/admin/Analytics"));
const ContentEditor = lazy(() => import("./components/admin/ContentEditor"));
const Recommendations = lazy(() => import("./components/admin/Recommendations"));

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin border-opacity-50"></div>
  </div>
);

function AppContent() {
  useAnalyticsLogger();

  return (
    <ExperimentProvider>
      <ContentProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/specialisms" element={<SpecialismsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/location-announcement" element={<LocationDetails />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<LeadsTable />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="recommendations" element={<Recommendations />} />
              <Route path="content" element={<ContentEditor />} />
            </Route>
          </Routes>
        </Suspense>
      </ContentProvider>
    </ExperimentProvider>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
