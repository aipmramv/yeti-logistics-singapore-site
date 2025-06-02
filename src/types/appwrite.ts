
export interface AboutInfo {
  title: string;
  story: string;
  mission: string;
  vision: string;
  years_experience: number;
  image: string;
}

export interface Service {
  $id: string;
  title: string;
  description: string;
  icon_key: string;
  order: number;
}

export interface TeamMember {
  $id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  order: number;
}

export interface Testimonial {
  $id: string;
  company: string;
  name: string;
  position: string;
  message: string;
  rating: number;
}

export interface Job {
  $id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  published: boolean;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  registration: string;
  founded: number;
}
