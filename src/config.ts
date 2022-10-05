export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT)
  : 3000;

export const DATABASE_URL: string =
  process.env.DATABASE_URL ??
  'postgresql://postgres:postgres@localhost:5432/postgres';

export const JWT_SECRET: string = process.env.JWT_SECRET;
