import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { subject, text, html } = req.body;

  // TODO: Replace with your SMTP server details
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'username',
      pass: 'password',
    },
  });

  try {
    await transporter.sendMail({
      from: 'no-reply@yetilogistics.com',
      to: 'enquiry@yetilogistics.com',
      subject,
      text,
      html,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email', details: error });
  }
}
