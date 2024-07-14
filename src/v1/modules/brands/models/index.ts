import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { User } from '../../auth/models'
import { IUser } from '../../auth/interface'
import { IBrandProfile } from '../interface'

@Entity()
export class BrandProfile implements IBrandProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToOne(() => User, (user) => user.brandProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column()
  websiteURL: string
}
