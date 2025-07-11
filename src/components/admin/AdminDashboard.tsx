import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Users, MessageSquare, Briefcase, Award, Settings } from 'lucide-react';

interface DashboardStats {
  services: number;
  features: number;
  teamMembers: number;
  testimonials: number;
  jobListings: number;
}

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    services: 0,
    features: 0,
    teamMembers: 0,
    testimonials: 0,
    jobListings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [services, features, team, testimonials, jobs] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('why_choose_features').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('job_listings').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        services: services.count || 0,
        features: features.count || 0,
        teamMembers: team.count || 0,
        testimonials: testimonials.count || 0,
        jobListings: jobs.count || 0,
      });
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: 'Services',
      count: stats.services,
      description: 'Active services',
      icon: Settings,
      color: 'text-blue-600',
    },
    {
      title: 'Features',
      count: stats.features,
      description: 'Why choose us features',
      icon: Award,
      color: 'text-green-600',
    },
    {
      title: 'Team Members',
      count: stats.teamMembers,
      description: 'Team members',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Testimonials',
      count: stats.testimonials,
      description: 'Customer testimonials',
      icon: MessageSquare,
      color: 'text-orange-600',
    },
    {
      title: 'Job Listings',
      count: stats.jobListings,
      description: 'Open positions',
      icon: Briefcase,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the Yeti Logistics CMS. Manage your website content here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.count}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Use the sidebar to navigate to different content sections and manage your website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Content Sections</h3>
              <p className="text-sm text-muted-foreground">
                Manage hero section, about section, services, and features from the sidebar.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Team & Testimonials</h3>
              <p className="text-sm text-muted-foreground">
                Add and edit team members and customer testimonials.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};