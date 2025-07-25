import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const BookingManager = () => {
  const [bookings, setBookings] = useState<Array<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service_type?: string;
    pickup_address?: string;
    delivery_address?: string;
    cargo_description?: string;
    special_requests?: string;
    created_at: string;
    updated_at: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('booking_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      setBookings(data || []);
      setError(error ? error.message : null);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Submissions</CardTitle>
        <CardDescription>View and manage booking requests submitted from the website.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : bookings.length === 0 ? (
          <div>No booking submissions found.</div>
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
                  <th className="p-2 border">Pickup Address</th>
                  <th className="p-2 border">Delivery Address</th>
                  <th className="p-2 border">Cargo Description</th>
                  <th className="p-2 border">Special Requests</th>
                  <th className="p-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="p-2 border">{b.name}</td>
                    <td className="p-2 border">{b.email}</td>
                    <td className="p-2 border">{b.phone}</td>
                    <td className="p-2 border">{b.company}</td>
                    <td className="p-2 border">{b.service_type}</td>
                    <td className="p-2 border">{b.pickup_address}</td>
                    <td className="p-2 border">{b.delivery_address}</td>
                    <td className="p-2 border">{b.cargo_description}</td>
                    <td className="p-2 border">{b.special_requests}</td>
                    <td className="p-2 border">{new Date(b.created_at).toLocaleString()}</td>
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

export default BookingManager;
