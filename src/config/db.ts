import { DataSource } from 'typeorm'
import { User, Role, Verification } from '../v1/modules/auth/models'
import { ContactUsForm } from '../v1/modules/landing/models'
import { BrandProfile, AgencyProfile } from '../v1/modules/brands/models'
import {
  AdminProfile,
  EmployeeProfile,
  Remarks,
} from '../v1/modules/admin/models'
import {
  InfluencerProfile,
  YoutubeProfileStats,
  TwitterProfileStats,
  InstagramProfileStats,
} from '../v1/modules/influencer/models'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.ENV !== 'production',
  entities: [
    User,
    ContactUsForm,
    Role,
    BrandProfile,
    EmployeeProfile,
    AdminProfile,
    AgencyProfile,
    InfluencerProfile,
    Verification,
    Remarks,
    YoutubeProfileStats,
    InstagramProfileStats,
    TwitterProfileStats,
  ],
  ssl: { rejectUnauthorized: false },
})
