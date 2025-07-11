import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const HeroContentManager = () => {
  const [content, setContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    cta_text: '',
    background_image: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        title: "Error fetching content",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setContent(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    
    const { error } = await supabase
      .from('hero_content')
      .upsert({
        ...content,
        is_active: true,
      });

    if (error) {
      toast({
        title: "Error saving content",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Content saved",
        description: "Hero section content has been updated successfully.",
      });
    }
    setSaving(false);
  };

  if (loading) {
    return <div>Loading hero content...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Content</CardTitle>
        <CardDescription>
          Manage the main hero section content that visitors see first.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={content.title}
            onChange={(e) => setContent({ ...content, title: e.target.value })}
            placeholder="Your Trusted Cold Chain & Logistics Partner"
          />
        </div>
        
        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={content.subtitle}
            onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
            placeholder="Professional Logistics Solutions"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={content.description}
            onChange={(e) => setContent({ ...content, description: e.target.value })}
            placeholder="Yeti Logistics specializes in cold chain management..."
            rows={3}
          />
        </div>
        
        <div>
          <Label htmlFor="cta_text">Call-to-Action Button Text</Label>
          <Input
            id="cta_text"
            value={content.cta_text}
            onChange={(e) => setContent({ ...content, cta_text: e.target.value })}
            placeholder="Get Quote"
          />
        </div>
        
        <div>
          <Label htmlFor="background_image">Background Image URL</Label>
          <Input
            id="background_image"
            value={content.background_image}
            onChange={(e) => setContent({ ...content, background_image: e.target.value })}
            placeholder="https://example.com/hero-image.jpg"
          />
        </div>
        
        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};