import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { IRole, IVerification, type IUser } from '../interface'
import 'reflect-metadata'
import { AgencyProfile, BrandProfile } from '../../brands/models'
import { IAgencyProfile, IBrandProfile } from '../../brands/interface'
import { InfluencerProfile } from '../../influencer/models'
import { IInfluencerProfile } from '../../influencer/interface'
import { EmployeeProfile, Remarks } from '../../admin/models'
import { IEmployeeProfile, IRemarks } from '../../admin/interface'
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

  @Column({ default: false, type: 'boolean' })
  isPaused: boolean

  @Column({ default: null, type: 'boolean' })
  isApproved: boolean

  @OneToOne(() => BrandProfile, (brandProfile) => brandProfile.user, {
    onDelete: 'CASCADE',
  })
  brandProfile: IBrandProfile

  @OneToOne(() => AgencyProfile, (agencyProfile) => agencyProfile.user, {
    onDelete: 'CASCADE',
  })
  agencyProfile: IAgencyProfile

  @OneToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.user,
    { onDelete: 'CASCADE' }
  )
  influencerProfile: IInfluencerProfile

  @OneToOne(() => EmployeeProfile, (employeeProfile) => employeeProfile.user, {
    onDelete: 'CASCADE',
  })
  employeeProfile: IEmployeeProfile

  @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user, {
    onDelete: 'CASCADE',
  })
  adminProfile: IAdminProfile

  @OneToMany(() => Remarks, (remarks) => remarks.remarker)
  remarks: IRemarks[]
}

@Entity()
export class Verification extends BaseEntity implements IVerification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true, nullable: false, type: 'varchar' })
  mobileNo: string

  @Column({ nullable: false, type: 'varchar' })
  otp: string

  @Column({ nullable: false, type: 'varchar' })
  expireIn: number
}
