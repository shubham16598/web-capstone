import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const database = new Pool({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DB_PORT as string),
});
