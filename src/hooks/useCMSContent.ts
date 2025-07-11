import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useHeroContent() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .single();
      
      setContent(data);
      setLoading(false);
    };

    fetchContent();
  }, []);

  return { content, loading };
}

export function useAboutContent() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('about_content')
        .select('*')
        .eq('is_active', true)
        .single();
      
      setContent(data);
      setLoading(false);
    };

    fetchContent();
  }, []);

  return { content, loading };
}

export function useServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      setServices(data || []);
      setLoading(false);
    };

    fetchServices();
  }, []);

  return { services, loading };
}

export function useFeatures() {
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      const { data } = await supabase
        .from('why_choose_features')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      setFeatures(data || []);
      setLoading(false);
    };

    fetchFeatures();
  }, []);

  return { features, loading };
}

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      setTeamMembers(data || []);
      setLoading(false);
    };

    fetchTeamMembers();
  }, []);

  return { teamMembers, loading };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      setTestimonials(data || []);
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading };
}

export function useJobListings() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_published', true)
        .order('display_order');
      
      setJobs(data || []);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  return { jobs, loading };
}