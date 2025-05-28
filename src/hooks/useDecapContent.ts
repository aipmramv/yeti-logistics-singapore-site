import { useState, useEffect } from 'react';

interface ContentHook<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Parse frontmatter from markdown content
const parseFrontmatter = (content: string) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatter = match[1];
  const data: any = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Convert numbers
      if (!isNaN(Number(value)) && value !== '') {
        data[key] = Number(value);
      }
      // Convert booleans
      else if (value === 'true') {
        data[key] = true;
      }
      else if (value === 'false') {
        data[key] = false;
      }
      // Keep as string
      else {
        data[key] = value;
      }
    }
  });
  
  return data;
};

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
        
        const content = await response.text();
        const parsedData = parseFrontmatter(content);
        setData(parsedData as T);
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
        
        // Try to fetch individual markdown files from the collection
        const collectionData: T[] = [];
        
        // This would need to be adapted based on actual file structure
        // For now, we'll handle the fallback case
        throw new Error('Collection loading not yet implemented');
        
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
