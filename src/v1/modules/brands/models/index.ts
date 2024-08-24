import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../../user/models'
import { IUser } from '../../user/interface'
import { IBrandProfile } from '../interface'

@Entity()
export class BrandProfile implements IBrandProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  pocFirstName: string

  @Column({ type: 'varchar', nullable: true })
  pocLastName: string

  @OneToOne(() => User, (user) => user.brandProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ type: 'varchar', nullable: false })
  websiteURL: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class AgencyProfile implements IBrandProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  pocFirstName: string

  @Column({ type: 'varchar', nullable: true })
  pocLastName: string

  @OneToOne(() => User, (user) => user.agencyProfile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ type: 'varchar', nullable: false })
  websiteURL: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
