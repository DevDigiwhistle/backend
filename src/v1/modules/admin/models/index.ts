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
import { IEmployeeProfile } from '../../admin/interface'

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
