import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const ContactManager = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      setSubmissions(data || []);
      setError(error ? error.message : null);
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Submissions</CardTitle>
        <CardDescription>View and manage contact/enquiry submissions from the website contact form.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : submissions.length === 0 ? (
          <div>No contact submissions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Company</th>
                  <th className="p-2 border">Service Type</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td className="p-2 border">{s.name}</td>
                    <td className="p-2 border">{s.email}</td>
                    <td className="p-2 border">{s.phone}</td>
                    <td className="p-2 border">{s.company}</td>
                    <td className="p-2 border">{s.service_type}</td>
                    <td className="p-2 border">{s.message}</td>
                    <td className="p-2 border">{new Date(s.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactManager;
