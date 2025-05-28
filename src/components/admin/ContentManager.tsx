import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentManagerProps {
  contentType: string;
}

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

type TeamItem = {
  id: number;
  name: string;
  position: string;
  image: string;
};

type TestimonialItem = {
  id: number;
  name: string;
  message: string;
  rating: number;
};

type ContentItem = ServiceItem | TeamItem | TestimonialItem;

const ContentManager = ({ contentType }: ContentManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const { toast } = useToast();

  // Mock data for demonstration
  const getMockData = (): ContentItem[] => {
    switch (contentType) {
      case "services":
        return [
          { id: 1, title: "Cold Chain Solutions", description: "Temperature-controlled logistics", icon: "❄️" },
          { id: 2, title: "Supply Chain Management", description: "End-to-end supply chain optimization", icon: "📦" },
          { id: 3, title: "B2B Delivery", description: "Business-to-business delivery services", icon: "🚚" },
        ] as ServiceItem[];
      case "team":
        return [
          { id: 1, name: "John Doe", position: "CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
          { id: 2, name: "Jane Smith", position: "Operations Manager", image: "https://images.unsplash.com/photo-1494790108755-2616b811e8ef?w=150&h=150&fit=crop&crop=face" },
        ] as TeamItem[];
      case "testimonials":
        return [
          { id: 1, name: "ABC Company", message: "Excellent service and reliability", rating: 5 },
          { id: 2, name: "XYZ Corp", message: "Outstanding cold chain solutions", rating: 5 },
        ] as TestimonialItem[];
      default:
        return [];
    }
  };

  const [items, setItems] = useState<ContentItem[]>(getMockData());

  const handleSave = () => {
    toast({
      title: "Content Saved",
      description: `${contentType} content has been updated successfully.`,
    });
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "The item has been removed successfully.",
    });
  };

  const renderItemDisplay = (item: ContentItem) => {
    if ('title' in item && 'description' in item && 'icon' in item) {
      // Service item
      const serviceItem = item as ServiceItem;
      return (
        <div>
          <h3 className="font-semibold">{serviceItem.icon} {serviceItem.title}</h3>
          <p className="text-gray-600">{serviceItem.description}</p>
        </div>
      );
    } else if ('name' in item && 'position' in item && 'image' in item) {
      // Team item
      const teamItem = item as TeamItem;
      return (
        <div className="flex items-center space-x-3">
          <img src={teamItem.image} alt={teamItem.name} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold">{teamItem.name}</h3>
            <p className="text-gray-600">{teamItem.position}</p>
          </div>
        </div>
      );
    } else if ('name' in item && 'message' in item && 'rating' in item) {
      // Testimonial item
      const testimonialItem = item as TestimonialItem;
      return (
        <div>
          <h3 className="font-semibold">{testimonialItem.name}</h3>
          <p className="text-gray-600">{testimonialItem.message}</p>
          <div className="text-yellow-500">{"★".repeat(testimonialItem.rating)}</div>
        </div>
      );
    }
    return null;
  };

  const renderForm = () => {
    switch (contentType) {
      case "services":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Service Title</Label>
              <Input id="title" placeholder="Enter service title" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter service description" />
            </div>
            <div>
              <Label htmlFor="icon">Icon (emoji or text)</Label>
              <Input id="icon" placeholder="Enter icon" />
            </div>
          </div>
        );
      case "team":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter team member name" />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Enter position" />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="Enter image URL" />
            </div>
          </div>
        );
      case "testimonials":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" placeholder="Enter company name" />
            </div>
            <div>
              <Label htmlFor="message">Testimonial</Label>
              <Textarea id="message" placeholder="Enter testimonial message" />
            </div>
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input id="rating" type="number" min="1" max="5" placeholder="Enter rating" />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter title" />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Enter content" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold capitalize">{contentType} Management</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit' : 'Add New'} {contentType}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderForm()}
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1">
                {renderItemDisplay(item)}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
