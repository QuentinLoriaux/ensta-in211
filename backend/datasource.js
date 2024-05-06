import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  entities: ['entities/*.js'],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
  extra: {
    ssl:
      {
        rejectUnauthorized: false,
    },
  },
});
