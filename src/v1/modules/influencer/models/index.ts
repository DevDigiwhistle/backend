import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IUser } from '../../auth/interface'
import { IInfluencerProfile } from '../interface'
import { User } from '../../auth/models'

@Entity()
export class InfluencerProfile implements IInfluencerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName: string

  @OneToOne(() => User, (user) => user.influencerProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ type: 'varchar', nullable: true })
  twitterURL?: string

  @Column({ type: 'varchar', nullable: true })
  youtubeURL?: string

  @Column({ type: 'varchar', nullable: true })
  instagramURL?: string

  @Column({ type: 'varchar', nullable: true })
  linkedInURL?: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
