
export const STRAPI_CONFIG = {
  // Change this to your Strapi API URL
  BASE_URL: process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337',
  
  // API endpoints
  ENDPOINTS: {
    SERVICES: '/api/services',
    TEAM: '/api/team-members',
    TESTIMONIALS: '/api/testimonials',
    JOBS: '/api/job-listings',
    COMPANY: '/api/company-info',
    ABOUT: '/api/about-info'
  },
  
  // Cache settings
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  
  // Fallback settings
  USE_FALLBACK_ON_ERROR: true
};
