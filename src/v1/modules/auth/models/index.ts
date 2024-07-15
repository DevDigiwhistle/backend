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
import { BrandProfile } from '../../brands/models'
import { IBrandProfile } from '../../brands/interface'
import { influencerProfile } from '../../influencer/models'
import { IInfluencerProfile } from '../../influencer/interface'

@Entity()
export class Role extends BaseEntity implements IRole {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: Enum.ROLES,
    nullable: false,
  })
  name: Enum.ROLES

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

  @OneToOne(
    () => influencerProfile,
    (influencerProfile) => influencerProfile.user
  )
  influencerProfile: IInfluencerProfile
}
