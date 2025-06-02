
import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('683d45a8001d8dd84e47'); // Your project ID

export const databases = new Databases(client);
export const account = new Account(client);

// Database and Collection IDs - update these with your actual collection IDs
export const DATABASE_ID = '683d4628002780c73bbe';
export const COLLECTIONS = {
  SERVICES: 'services-collection-id', // Replace with your actual collection ID
  TEAM: 'team-collection-id', // Replace with your actual collection ID
  TESTIMONIALS: 'testimonials-collection-id', // Replace with your actual collection ID
  JOBS: 'jobs-collection-id', // Replace with your actual collection ID
  COMPANY: 'company-collection-id', // Replace with your actual collection ID
  ABOUT: 'about-collection-id' // Replace with your actual collection ID
};

export { client };
