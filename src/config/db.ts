import { DataSource } from 'typeorm'
import { User, Role } from '../v1/modules/auth/models/index'
import { ContactUsForm } from '../v1/modules/landing/models'
import { BrandProfile } from '../v1/modules/brands/models'
import { EmployeeProfile } from '../v1/modules/employee/models'
import { AdminProfile } from '../v1/modules/admin/models'
import { InfluencerProfile } from '../v1/modules/influencer/models'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.ENV !== 'production',
  logging: process.env.ENV !== 'production',
  entities: [
    User,
    ContactUsForm,
    Role,
    BrandProfile,
    EmployeeProfile,
    AdminProfile,
    InfluencerProfile,
  ],
  ssl: true,
})
