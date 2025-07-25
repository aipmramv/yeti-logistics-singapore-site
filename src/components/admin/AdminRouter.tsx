import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { HeroContentManager } from './HeroContentManager';
import { AboutContentManager } from './AboutContentManager';
import { ServicesManager } from './ServicesManager';
import { FeaturesManager } from './FeaturesManager';
import { TeamManager } from './TeamManager';
import { TestimonialsManager } from './TestimonialsManager';
import { JobListingsManager } from './JobListingsManager';
import ContactManager from './ContactManager';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/hero" element={<HeroContentManager />} />
      <Route path="hero" element={<HeroContentManager />} />
      <Route path="/about" element={<AboutContentManager />} />
      <Route path="about" element={<AboutContentManager />} />
      <Route path="/services" element={<ServicesManager />} />
      <Route path="services" element={<ServicesManager />} />
      <Route path="/features" element={<FeaturesManager />} />
      <Route path="features" element={<FeaturesManager />} />
      <Route path="/team" element={<TeamManager />} />
      <Route path="team" element={<TeamManager />} />
      <Route path="/testimonials" element={<TestimonialsManager />} />
      <Route path="testimonials" element={<TestimonialsManager />} />
      <Route path="/jobs" element={<JobListingsManager />} />
      <Route path="jobs" element={<JobListingsManager />} />
      <Route path="/contact" element={<ContactManager />} />
      <Route path="contact" element={<ContactManager />} />
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
};