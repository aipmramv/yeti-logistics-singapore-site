
import { useState, useEffect } from 'react';
import { wordpressApi, WordPressPost, WordPressPage } from '@/services/wordpressApi';

interface UseWordPressResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useWordPressPosts = (params?: { per_page?: number; categories?: string }): UseWordPressResult<WordPressPost[]> => {
  const [data, setData] = useState<WordPressPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const posts = await wordpressApi.fetchPosts(params);
        setData(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params?.per_page, params?.categories]);

  return { data, loading, error };
};

export const useWordPressPage = (slug: string): UseWordPressResult<WordPressPage> => {
  const [data, setData] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const page = await wordpressApi.fetchPage(slug);
        setData(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress page:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return { data, loading, error };
};

export const useWordPressCustomPosts = (postType: string, params?: { per_page?: number }): UseWordPressResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const posts = await wordpressApi.fetchCustomPostType(postType, params);
        setData(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(`Error fetching WordPress ${postType}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postType, params?.per_page]);

  return { data, loading, error };
};

// Specific hooks for each content type
export const useWordPressServices = (): UseWordPressResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const services = await wordpressApi.fetchServices();
        setData(services);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress services:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useWordPressTeam = (): UseWordPressResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const team = await wordpressApi.fetchTeamMembers();
        setData(team);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress team:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useWordPressTestimonials = (): UseWordPressResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const testimonials = await wordpressApi.fetchTestimonials();
        setData(testimonials);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress testimonials:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useWordPressJobs = (): UseWordPressResult<any[]> => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobs = await wordpressApi.fetchJobs();
        setData(jobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress jobs:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useWordPressCompanyInfo = (): UseWordPressResult<any> => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const companyInfo = await wordpressApi.fetchCompanyInfo();
        setData(companyInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress company info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useWordPressAboutInfo = (): UseWordPressResult<any> => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const aboutInfo = await wordpressApi.fetchAboutInfo();
        setData(aboutInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching WordPress about info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
