import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { IUser } from '../../auth/interface'
import { IEmployeeProfile } from '../interface'
import { User } from '../../auth/models'

@Entity()
export class EmployeeProfile implements IEmployeeProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  mobileNo: string

  @OneToOne(() => User, (user) => user.influencerProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser
}
