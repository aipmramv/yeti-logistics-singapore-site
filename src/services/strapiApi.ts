
import { STRAPI_CONFIG } from '@/config/strapi';

export interface StrapiService {
  id: number;
  attributes: {
    title: string;
    description: string;
    icon_key: string;
    order: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiTeamMember {
  id: number;
  attributes: {
    name: string;
    position: string;
    bio: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    order: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiTestimonial {
  id: number;
  attributes: {
    company: string;
    name: string;
    position: string;
    message: string;
    rating: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiJob {
  id: number;
  attributes: {
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string;
    published: boolean;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiCompanyInfo {
  id: number;
  attributes: {
    name: string;
    address: string;
    phone: string;
    email: string;
    registration: string;
    founded: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiAboutInfo {
  id: number;
  attributes: {
    title: string;
    story: string;
    mission: string;
    vision: string;
    years_experience: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

class StrapiAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = STRAPI_CONFIG.BASE_URL;
  }

  private async fetchData<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Add populate parameter for Strapi to include relations
    url.searchParams.append('populate', '*');
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          url.searchParams.append(key, params[key].toString());
        }
      });
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async fetchServices(): Promise<StrapiService[]> {
    const response = await this.fetchData<{ data: StrapiService[] }>(STRAPI_CONFIG.ENDPOINTS.SERVICES);
    return response.data;
  }

  async fetchTeamMembers(): Promise<StrapiTeamMember[]> {
    const response = await this.fetchData<{ data: StrapiTeamMember[] }>(STRAPI_CONFIG.ENDPOINTS.TEAM);
    return response.data;
  }

  async fetchTestimonials(): Promise<StrapiTestimonial[]> {
    const response = await this.fetchData<{ data: StrapiTestimonial[] }>(STRAPI_CONFIG.ENDPOINTS.TESTIMONIALS);
    return response.data;
  }

  async fetchJobs(): Promise<StrapiJob[]> {
    const response = await this.fetchData<{ data: StrapiJob[] }>(STRAPI_CONFIG.ENDPOINTS.JOBS);
    return response.data;
  }

  async fetchCompanyInfo(): Promise<StrapiCompanyInfo> {
    const response = await this.fetchData<{ data: StrapiCompanyInfo }>(STRAPI_CONFIG.ENDPOINTS.COMPANY);
    return response.data;
  }

  async fetchAboutInfo(): Promise<StrapiAboutInfo> {
    const response = await this.fetchData<{ data: StrapiAboutInfo }>(STRAPI_CONFIG.ENDPOINTS.ABOUT);
    return response.data;
  }
}

export const strapiApi = new StrapiAPI();
