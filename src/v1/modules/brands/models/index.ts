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

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'varchar', nullable: false })
  pocFirstName: string

  @Column({ type: 'varchar', nullable: true })
  pocLastName: string

  @OneToOne(() => User, (user) => user.brandProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ type: 'varchar', nullable: false })
  websiteURL: string

  @Column({ type: 'varchar', nullable: false })
  mobileNo: string
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

  @OneToOne(() => User, (user) => user.agencyProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ type: 'varchar', nullable: false })
  websiteURL: string

  @Column({ type: 'varchar', nullable: false })
  mobileNo: string
}
