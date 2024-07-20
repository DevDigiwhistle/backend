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

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName: string

  @Column({ type: 'varchar', nullable: false })
  mobileNo: string

  @OneToOne(() => User, (user) => user.employeeProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser
}
