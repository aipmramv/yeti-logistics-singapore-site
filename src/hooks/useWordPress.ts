
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
