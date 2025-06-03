
import { useState, useEffect } from 'react';
import { strapiApi, StrapiService, StrapiTeamMember, StrapiTestimonial, StrapiJob, StrapiCompanyInfo, StrapiAboutInfo } from '@/services/strapiApi';

interface UseStrapiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useStrapiServices = (): UseStrapiResult<StrapiService[]> => {
  const [data, setData] = useState<StrapiService[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const services = await strapiApi.fetchServices();
        setData(services);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Strapi services:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStrapiTeam = (): UseStrapiResult<StrapiTeamMember[]> => {
  const [data, setData] = useState<StrapiTeamMember[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const team = await strapiApi.fetchTeamMembers();
        setData(team);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Strapi team:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStrapiTestimonials = (): UseStrapiResult<StrapiTestimonial[]> => {
  const [data, setData] = useState<StrapiTestimonial[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const testimonials = await strapiApi.fetchTestimonials();
        setData(testimonials);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Strapi testimonials:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStrapiJobs = (): UseStrapiResult<StrapiJob[]> => {
  const [data, setData] = useState<StrapiJob[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobs = await strapiApi.fetchJobs();
        setData(jobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Strapi jobs:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStrapiCompanyInfo = (): UseStrapiResult<StrapiCompanyInfo> => {
  const [data, setData] = useState<StrapiCompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const companyInfo = await strapiApi.fetchCompanyInfo();
        setData(companyInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Strapi company info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useStrapiAboutInfo = (): UseStrapiResult<StrapiAboutInfo> => {
  const [data, setData] = useState<StrapiAboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const aboutInfo = await strapiApi.fetchAboutInfo();
        setData(aboutInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching Strapi about info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
