import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Briefcase, Users } from 'lucide-react';

interface JobListing {
  id: string;
  title: string;
  description: string;
  type: string;
  department: string;
  location: string;
  requirements: string;
  benefits: string;
  display_order: number;
  is_published: boolean;
}

const jobTypes = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' }
];

const departments = [
  { value: 'operations', label: 'Operations' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'administration', label: 'Administration' },
  { value: 'management', label: 'Management' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'transport', label: 'Transport' }
];

export const JobListingsManager = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job listings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_listings (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleSave = async (job: Partial<JobListing>) => {
    setIsSaving(true);
    try {
      const jobData = {
        title: job.title,
        description: job.description,
        type: job.type,
        department: job.department,
        location: job.location,
        requirements: job.requirements,
        benefits: job.benefits,
        display_order: job.display_order || 0,
        is_published: job.is_published ?? false
      };

      let result;
      if (job.id) {
        result = await supabase
          .from('job_listings')
          .update(jobData)
          .eq('id', job.id);
      } else {
        result = await supabase
          .from('job_listings')
          .insert([jobData]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Job listing ${job.id ? 'updated' : 'created'} successfully`
      });

      fetchJobs();
      setIsDialogOpen(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error saving job:', error);
      toast({
        title: "Error",
        description: "Failed to save job listing",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return;

    try {
      const { error } = await supabase
        .from('job_listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job listing deleted successfully"
      });

      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job listing",
        variant: "destructive"
      });
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Application status updated"
      });

      fetchApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
    }
  };

  const openDialog = (job?: JobListing) => {
    setEditingJob(job || {
      id: '',
      title: '',
      description: '',
      type: 'full-time',
      department: 'operations',
      location: 'Singapore',
      requirements: '',
      benefits: '',
      display_order: jobs.length,
      is_published: false
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
          <h2 className="text-2xl font-bold">Jobs & Applications</h2>
          <p className="text-muted-foreground">Manage job listings and applications</p>
        </div>
        <div className="flex space-x-2">
          <div className="border rounded p-1">
            <Button
              variant={activeTab === 'jobs' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('jobs')}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Jobs ({jobs.length})
            </Button>
            <Button
              variant={activeTab === 'applications' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('applications')}
            >
              <Users className="h-4 w-4 mr-2" />
              Applications ({applications.length})
            </Button>
          </div>
          {activeTab === 'jobs' && (
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          )}
        </div>
      </div>

      {activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription>
                      {job.department} • {job.type} • {job.location}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog(job)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-3">
                  {job.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    Order: {job.display_order}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    job.is_published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {job.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{application.name}</CardTitle>
                    <CardDescription>
                      Applied for: {application.job_listings?.title}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Select
                      value={application.status}
                      onValueChange={(status) => updateApplicationStatus(application.id, status)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewing">Reviewing</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="hired">Hired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Email:</strong> {application.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {application.phone}
                  </div>
                  <div>
                    <strong>Applied:</strong> {new Date(application.created_at).toLocaleDateString()}
                  </div>
                </div>
                {application.cover_letter && (
                  <div className="mt-2">
                    <strong>Cover Letter:</strong>
                    <p className="text-sm text-muted-foreground mt-1">
                      {application.cover_letter}
                    </p>
                  </div>
                )}
                {application.resume_url && (
                  <div className="mt-2">
                    <a
                      href={application.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Resume
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingJob?.id ? 'Edit Job Listing' : 'Add Job Listing'}
            </DialogTitle>
            <DialogDescription>
              {editingJob?.id ? 'Update job listing information' : 'Create a new job listing'}
            </DialogDescription>
          </DialogHeader>

          {editingJob && (
            <JobForm
              job={editingJob}
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

interface JobFormProps {
  job: JobListing;
  onSave: (job: JobListing) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSave, onCancel, isSaving }) => {
  const [formData, setFormData] = useState(job);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Job title"
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Job location"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Job Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Job description"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
          placeholder="Job requirements"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="benefits">Benefits</Label>
        <Textarea
          id="benefits"
          value={formData.benefits}
          onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
          placeholder="Job benefits"
          rows={3}
        />
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
          id="published"
          checked={formData.is_published}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
        />
        <Label htmlFor="published">Published</Label>
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