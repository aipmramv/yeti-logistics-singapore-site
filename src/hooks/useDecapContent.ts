
import { useState, useEffect } from 'react';

interface ContentHook<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useDecapContent = <T>(contentPath: string): ContentHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(contentPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`);
        }
        
        const content = await response.json();
        setData(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentPath]);

  return { data, loading, error };
};

export const useDecapCollection = <T>(collectionName: string): ContentHook<T[]> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to load from content folder
        const response = await fetch(`/content/${collectionName}/index.json`);
        if (response.ok) {
          const content = await response.json();
          setData(content);
        } else {
          // Fallback to empty array if no content exists
          setData([]);
        }
      } catch (err) {
        // Use fallback data for now
        setError(err instanceof Error ? err.message : 'Content not found, using fallback');
        setData([]);
        console.warn(`No CMS content found for ${collectionName}, using fallback data`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionName]);

  return { data, loading, error };
};
