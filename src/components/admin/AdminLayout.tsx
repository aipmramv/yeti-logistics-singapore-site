import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Home, Users, Briefcase, MessageSquare, Settings, LogOut, FileText, Award } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin', icon: Home },
  { title: 'Hero Section', url: '/admin/hero', icon: FileText },
  { title: 'About Section', url: '/admin/about', icon: FileText },
  { title: 'Services', url: '/admin/services', icon: Settings },
  { title: 'Features', url: '/admin/features', icon: Award },
  { title: 'Team Members', url: '/admin/team', icon: Users },
  { title: 'Testimonials', url: '/admin/testimonials', icon: MessageSquare },
  { title: 'Job Listings', url: '/admin/jobs', icon: Briefcase },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64">
          <SidebarContent>
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Yeti CMS</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Content Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminMenuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={({ isActive }) =>
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <header className="h-16 flex items-center border-b px-6">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </header>
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};