
import { useState, useEffect } from 'react';
import { databases, DATABASE_ID, COLLECTIONS } from '@/config/appwrite';
import { Query } from 'appwrite';
import type { Service, TeamMember, Testimonial, Job, CompanyInfo, AboutInfo } from '@/types/appwrite';

interface ContentHook<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAppwriteContent = <T>(collectionId: string, documentId?: string): ContentHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (documentId) {
          // Fetch single document
          const response = await databases.getDocument(DATABASE_ID, collectionId, documentId);
          setData(response as T);
        } else {
          // Fetch first document from collection (for single-page content like About)
          const response = await databases.listDocuments(DATABASE_ID, collectionId, [
            Query.limit(1)
          ]);
          setData(response.documents[0] as T || null);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load content');
        console.error('Error loading content from Appwrite:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [collectionId, documentId]);

  return { data, loading, error };
};

export const useAppwriteCollection = <T>(collectionId: string): ContentHook<T[]> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await databases.listDocuments(DATABASE_ID, collectionId, [
          Query.orderAsc('order'), // Order by 'order' field if it exists
          Query.limit(100)
        ]);
        
        setData(response.documents as T[]);
      } catch (err: any) {
        setError(err.message || 'Failed to load collection');
        console.error('Error loading collection from Appwrite:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  return { data, loading, error };
};

// Specific hooks for each content type
export const useServices = () => useAppwriteCollection<Service>(COLLECTIONS.SERVICES);
export const useTeam = () => useAppwriteCollection<TeamMember>(COLLECTIONS.TEAM);
export const useTestimonials = () => useAppwriteCollection<Testimonial>(COLLECTIONS.TESTIMONIALS);
export const useJobs = () => useAppwriteCollection<Job>(COLLECTIONS.JOBS);
export const useCompanyInfo = () => useAppwriteContent<CompanyInfo>(COLLECTIONS.COMPANY);
export const useAboutInfo = () => useAppwriteContent<AboutInfo>(COLLECTIONS.ABOUT);
