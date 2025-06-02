
import { Client, Databases, Account } from 'appwrite';

const client = new Client();

// You'll need to update these with your actual Appwrite project details
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('your-project-id'); // Your project ID

export const databases = new Databases(client);
export const account = new Account(client);

// Database and Collection IDs - update these with your actual IDs
export const DATABASE_ID = 'your-database-id';
export const COLLECTIONS = {
  SERVICES: 'services-collection-id',
  TEAM: 'team-collection-id',
  TESTIMONIALS: 'testimonials-collection-id',
  JOBS: 'jobs-collection-id',
  COMPANY: 'company-collection-id',
  ABOUT: 'about-collection-id'
};

export { client };
