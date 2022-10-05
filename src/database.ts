import { DATABASE_URL } from './config';
import { Client } from 'pg';

export const db = new Client({
  connectionString: DATABASE_URL,
});
