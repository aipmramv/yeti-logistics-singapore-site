import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon_key: string;
  display_order: number;
  is_active: boolean;
}

const iconOptions = [
  { value: 'clock', label: '24/7 Service' },
  { value: 'shield-check', label: 'Secure' },
  { value: 'truck', label: 'Fast Delivery' },
  { value: 'users', label: 'Expert Team' },
  { value: 'globe', label: 'Wide Coverage' },
  { value: 'award', label: 'Quality' },
  { value: 'phone', label: 'Customer Support' },
  { value: 'settings', label: 'Technology' }
];

export const FeaturesManager = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('why_choose_features')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setFeatures(data || []);
    } catch (error) {
      console.error('Error fetching features:', error);
      toast({
        title: "Error",
        description: "Failed to fetch features",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (feature: Partial<Feature>) => {
    setIsSaving(true);
    try {
      const featureData = {
        title: feature.title,
        description: feature.description,
        icon_key: feature.icon_key,
        display_order: feature.display_order || 0,
        is_active: feature.is_active ?? true
      };

      let result;
      if (feature.id) {
        result = await supabase
          .from('why_choose_features')
          .update(featureData)
          .eq('id', feature.id);
      } else {
        result = await supabase
          .from('why_choose_features')
          .insert([featureData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Feature ${feature.id ? 'updated' : 'created'} successfully`
      });

      fetchFeatures();
      setIsDialogOpen(false);
      setEditingFeature(null);
    } catch (error) {
      console.error('Error saving feature:', error);
      toast({
        title: "Error",
        description: "Failed to save feature",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) return;

    try {
      const { error } = await supabase
        .from('why_choose_features')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Feature deleted successfully"
      });

      fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
      toast({
        title: "Error",
        description: "Failed to delete feature",
        variant: "destructive"
      });
    }
  };

  const openDialog = (feature?: Feature) => {
    setEditingFeature(feature || {
      id: '',
      title: '',
      description: '',
      icon_key: 'clock',
      display_order: features.length,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Why Choose Us Features</h2>
          <p className="text-muted-foreground">Manage your competitive advantages</p>
        </div>
        <Button onClick={() => openDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>Order: {feature.display_order}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDialog(feature)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(feature.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {feature.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {feature.icon_key}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  feature.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {feature.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingFeature?.id ? 'Edit Feature' : 'Add Feature'}
            </DialogTitle>
            <DialogDescription>
              {editingFeature?.id ? 'Update feature information' : 'Create a new feature'}
            </DialogDescription>
          </DialogHeader>

          {editingFeature && (
            <FeatureForm
              feature={editingFeature}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
              isSaving={isSaving}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface FeatureFormProps {
  feature: Feature;
  onSave: (feature: Feature) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const FeatureForm: React.FC<FeatureFormProps> = ({ feature, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = useState(feature);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Feature title"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Feature description"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="icon">Icon</Label>
        <Select
          value={formData.icon_key}
          onValueChange={(value) => setFormData(prev => ({ ...prev, icon_key: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="order">Display Order</Label>
        <Input
          id="order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={formData.is_active}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
        />
        <Label htmlFor="active">Active</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? <Save className="h-4 w-4 mr-2 animate-pulse" /> : <Save className="h-4 w-4 mr-2" />}
          Save
        </Button>
      </div>
    </form>
  );
};