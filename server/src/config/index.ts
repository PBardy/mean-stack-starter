import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
  MAIL_FROM,
  WEBSITE_URL,
} = process.env;
