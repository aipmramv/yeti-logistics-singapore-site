import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { HeroContentManager } from './HeroContentManager';

export const AdminRouter = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/hero" element={<HeroContentManager />} />
      <Route path="hero" element={<HeroContentManager />} />
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
};