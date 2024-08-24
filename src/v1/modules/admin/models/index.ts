import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { IUser } from '../../user/interface'
import { IAdminProfile, IRemarks } from '../interface'
import { User } from '../../user/models'
import { IEmployeeProfile } from '../../admin/interface'

@Entity()
export class AdminProfile implements IAdminProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @Column({ type: 'varchar', default: null, nullable: true })
  profilePic: string

  @OneToOne(() => User, (user) => user.adminProfile, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: IUser

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class EmployeeProfile implements IEmployeeProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @Column({ type: 'varchar', default: null, nullable: true })
  profilePic: string

  @Column({ type: 'varchar', nullable: false })
  designation: string

  @OneToOne(() => User, (user) => user.employeeProfile, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: IUser

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class Remarks implements IRemarks {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', nullable: false })
  message: string

  @Column({ type: 'varchar', nullable: false })
  userId: string

  @ManyToOne(() => User, (user) => user.remarks, {
    eager: true,
    onDelete: 'CASCADE',
  })
  remarker: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
