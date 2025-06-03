
import { WORDPRESS_CONFIG } from '@/config/wordpress';

export interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  featured_media: number;
  categories: number[];
}

export interface WordPressPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  acf?: any; // Advanced Custom Fields
}

export interface WordPressService {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    description: string;
    icon_key: string;
    order: number;
  };
}

export interface WordPressTeamMember {
  id: number;
  title: { rendered: string };
  acf: {
    name: string;
    position: string;
    bio: string;
    image: string;
    order: number;
  };
}

export interface WordPressTestimonial {
  id: number;
  title: { rendered: string };
  acf: {
    company: string;
    name: string;
    position: string;
    message: string;
    rating: number;
  };
}

export interface WordPressJob {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    published: boolean;
  };
}

export interface WordPressCompanyInfo {
  id: number;
  acf: {
    name: string;
    address: string;
    phone: string;
    email: string;
    registration: string;
    founded: number;
  };
}

export interface WordPressAboutInfo {
  id: number;
  acf: {
    title: string;
    story: string;
    mission: string;
    vision: string;
    years_experience: number;
    image: string;
  };
}

class WordPressAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = WORDPRESS_CONFIG.BASE_URL;
  }

  private async fetchData<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          url.searchParams.append(key, params[key].toString());
        }
      });
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async fetchPosts(params?: { per_page?: number; categories?: string }): Promise<WordPressPost[]> {
    return this.fetchData<WordPressPost[]>(WORDPRESS_CONFIG.ENDPOINTS.POSTS, params);
  }

  async fetchPage(slug: string): Promise<WordPressPage> {
    const pages = await this.fetchData<WordPressPage[]>(WORDPRESS_CONFIG.ENDPOINTS.PAGES, { slug });
    if (pages.length === 0) {
      throw new Error(`Page with slug "${slug}" not found`);
    }
    return pages[0];
  }

  async fetchCustomPostType(postType: string, params?: { per_page?: number }): Promise<any[]> {
    const endpoint = `/wp-json/wp/v2/${postType}`;
    return this.fetchData<any[]>(endpoint, params);
  }

  async fetchServices(): Promise<WordPressService[]> {
    return this.fetchData<WordPressService[]>(WORDPRESS_CONFIG.ENDPOINTS.SERVICES);
  }

  async fetchTeamMembers(): Promise<WordPressTeamMember[]> {
    return this.fetchData<WordPressTeamMember[]>(WORDPRESS_CONFIG.ENDPOINTS.TEAM);
  }

  async fetchTestimonials(): Promise<WordPressTestimonial[]> {
    return this.fetchData<WordPressTestimonial[]>(WORDPRESS_CONFIG.ENDPOINTS.TESTIMONIALS);
  }

  async fetchJobs(): Promise<WordPressJob[]> {
    return this.fetchData<WordPressJob[]>(WORDPRESS_CONFIG.ENDPOINTS.CAREERS);
  }

  async fetchCompanyInfo(): Promise<WordPressCompanyInfo> {
    const data = await this.fetchData<WordPressCompanyInfo[]>(WORDPRESS_CONFIG.ENDPOINTS.COMPANY);
    return data[0];
  }

  async fetchAboutInfo(): Promise<WordPressAboutInfo> {
    const data = await this.fetchData<WordPressAboutInfo[]>(WORDPRESS_CONFIG.ENDPOINTS.ABOUT);
    return data[0];
  }
}

export const wordpressApi = new WordPressAPI();
