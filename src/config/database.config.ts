import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 1433,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
  };
});
