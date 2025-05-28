
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
        
        // Define known files for each collection
        const collectionFiles: { [key: string]: string[] } = {
          'services': ['supply-chain', 'cold-chain', 'inventory', 'delivery', 'warehousing'],
          'team': ['vimalasan', 'louis-tan', 'rishi-nathan'],
          'testimonials': ['fresh-food-distributors', 'singapore-food-solutions', 'premium-grocers'],
          'jobs': ['class-3-drivers', 'warehouse-packers', 'logistics-coordinator']
        };
        
        const files = collectionFiles[collectionName] || [];
        const collectionData: T[] = [];
        
        // Fetch each file in the collection
        for (const file of files) {
          try {
            const response = await fetch(`/content/${collectionName}/${file}.md`);
            if (response.ok) {
              const content = await response.text();
              const parsedData = parseFrontmatter(content);
              collectionData.push(parsedData as T);
            }
          } catch (fileErr) {
            console.warn(`Failed to load ${file}.md from ${collectionName}:`, fileErr);
          }
        }
        
        setData(collectionData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load collection');
        console.error('Error loading collection:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionName]);

  return { data, loading, error };
};
