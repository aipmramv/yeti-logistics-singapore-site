import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/ui/image-upload';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus } from 'lucide-react';

interface AboutContent {
  id: string;
  title: string;
  story: string;
  mission: string;
  vision: string;
  years_experience: string;
  image: string;
  is_active: boolean;
}

export const AboutContentManager = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContent(data);
      } else {
        // Create default content
        setContent({
          id: '',
          title: 'About Yeti Logistics',
          story: '',
          mission: '',
          vision: '',
          years_experience: '18+',
          image: '',
          is_active: true
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch about content",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      const contentData = {
        title: content.title,
        story: content.story,
        mission: content.mission,
        vision: content.vision,
        years_experience: content.years_experience,
        image: content.image,
        is_active: content.is_active
      };

      let result;
      if (content.id) {
        result = await supabase
          .from('about_content')
          .update(contentData)
          .eq('id', content.id);
      } else {
        result = await supabase
          .from('about_content')
          .insert([contentData])
          .select()
          .single();
        
        if (result.data) {
          setContent(prev => prev ? { ...prev, id: result.data.id } : null);
        }
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: "About content saved successfully"
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save about content",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (field: keyof AboutContent, value: any) => {
    setContent(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return <div>Error loading content</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">About Content</h2>
          <p className="text-muted-foreground">Manage the about section content</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Save className="h-4 w-4 mr-2 animate-pulse" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Main content and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="About section title"
              />
            </div>

            <div>
              <Label htmlFor="years">Years of Experience</Label>
              <Input
                id="years"
                value={content.years_experience}
                onChange={(e) => updateContent('years_experience', e.target.value)}
                placeholder="e.g., 18+"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={content.is_active}
                onCheckedChange={(checked) => updateContent('is_active', checked)}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image</CardTitle>
            <CardDescription>Upload an image for the about section</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={content.image}
              onChange={(url) => updateContent('image', url)}
              onRemove={() => updateContent('image', '')}
              label="About Section Image"
              folder="about"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>Tell the company's story</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content.story}
              onChange={(e) => updateContent('story', e.target.value)}
              placeholder="Our story..."
              rows={6}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission Statement</CardTitle>
            <CardDescription>Company mission</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content.mission}
              onChange={(e) => updateContent('mission', e.target.value)}
              placeholder="Our mission..."
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vision Statement</CardTitle>
            <CardDescription>Company vision</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content.vision}
              onChange={(e) => updateContent('vision', e.target.value)}
              placeholder="Our vision..."
              rows={4}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};