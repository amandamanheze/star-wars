import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/src/migration/**/*.js'],
});

export default AppDataSource;