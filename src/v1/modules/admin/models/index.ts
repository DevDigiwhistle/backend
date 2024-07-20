import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { IUser } from '../../auth/interface'
import { IAdminProfile } from '../interface'
import { User } from '../../auth/models'

@Entity()
export class AdminProfile implements IAdminProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName: string

  @Column({ type: 'varchar', nullable: false })
  mobileNo: string

  @OneToOne(() => User, (user) => user.adminProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser
}
