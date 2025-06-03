
export const WORDPRESS_CONFIG = {
  // Change this to your WordPress site URL
  BASE_URL: process.env.REACT_APP_WORDPRESS_URL || 'https://your-wordpress-site.com',
  
  // API endpoints
  ENDPOINTS: {
    POSTS: '/wp-json/wp/v2/posts',
    PAGES: '/wp-json/wp/v2/pages',
    MEDIA: '/wp-json/wp/v2/media',
    SERVICES: '/wp-json/wp/v2/services',
    TEAM: '/wp-json/wp/v2/team-members',
    TESTIMONIALS: '/wp-json/wp/v2/testimonials',
    CAREERS: '/wp-json/wp/v2/job-listings',
    COMPANY: '/wp-json/wp/v2/company-info',
    ABOUT: '/wp-json/wp/v2/about-info'
  },
  
  // Cache settings
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  
  // Fallback settings
  USE_FALLBACK_ON_ERROR: true,
  
  // Page slugs for different sections
  PAGE_SLUGS: {
    ABOUT: 'about-yeti-logistics',
    COMPANY_INFO: 'company-information',
    CONTACT: 'contact-information'
  }
};
