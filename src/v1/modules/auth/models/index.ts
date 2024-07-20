import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { Enum } from '../../../../constants'
import { IRole, type IUser } from '../interface'
import 'reflect-metadata'
import { AgencyProfile, BrandProfile } from '../../brands/models'
import { IAgencyProfile, IBrandProfile } from '../../brands/interface'
import { InfluencerProfile } from '../../influencer/models'
import { IInfluencerProfile } from '../../influencer/interface'
import { EmployeeProfile } from '../../employee/models'
import { IEmployeeProfile } from '../../employee/interface'
import { AdminProfile } from '../../admin/models'
import { IAdminProfile } from '../../admin/interface'

@Entity()
export class Role extends BaseEntity implements IRole {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false })
  name: string

  @OneToMany(() => User, (user) => user.role)
  users: User[]
}

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({ primary: true, type: 'varchar' })
  id: string

  @Column({ unique: true, type: 'varchar' })
  email: string

  @ManyToOne(() => Role, (role) => role.users)
  role: Role

  @Column({ default: false, type: 'boolean' })
  isVerified: boolean

  @OneToOne(() => BrandProfile, (brandProfile) => brandProfile.user)
  brandProfile: IBrandProfile

  @OneToOne(() => AgencyProfile, (agencyProfile) => agencyProfile.user)
  agencyProfile: IAgencyProfile

  @OneToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.user
  )
  influencerProfile: IInfluencerProfile

  @OneToOne(() => EmployeeProfile, (employeeProfile) => employeeProfile.user)
  employeeProfile: IEmployeeProfile

  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user)
  adminProfile: IAdminProfile
}
