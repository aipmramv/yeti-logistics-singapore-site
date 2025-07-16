import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useSupabaseQuery<T>(
  table: string,
  columns = '*',
  filters?: { [key: string]: any }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        let query = (supabase as any).from(table).select(columns);
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }
        
        // Order by display_order if it exists, otherwise by created_at
        query = query.order('display_order', { ascending: true, nullsFirst: false });
        
        const { data: result, error: queryError } = await query;
        
        if (queryError) {
          setError(queryError.message);
        } else {
          setData(result || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, columns, JSON.stringify(filters)]);

  return { data, loading, error };
}

export function useSupabaseSingle<T>(
  table: string,
  columns = '*',
  filters?: { [key: string]: any }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        let query = (supabase as any).from(table).select(columns);
        
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }
        
        const { data: result, error: queryError } = await query.maybeSingle();
        
        if (queryError) {
          setError(queryError.message);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, columns, JSON.stringify(filters)]);

  return { data, loading, error };
}