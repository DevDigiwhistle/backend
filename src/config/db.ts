import { DataSource } from 'typeorm'
import { User } from '../v1/modules/auth/models/index'
import { ContactUsForm } from '../v1/modules/landing/models'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.ENV !== 'production',
  logging: process.env.ENV !== 'production',
  entities: [User,ContactUsForm],
  ssl: true
})
