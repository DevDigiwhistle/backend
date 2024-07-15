import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { IUser } from '../../auth/interface'
import { IInfluencerProfile } from '../interface'
import { User } from '../../auth/models'

@Entity()
export class InfluencerProfile implements IInfluencerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ nullable: true })
  userId?: string

  @OneToOne(() => User, (user) => user.influencerProfile)
  @JoinColumn({ name: 'userId' })
  user: IUser

  @Column({ nullable: true })
  twitterURL?: string

  @Column({ nullable: true })
  youtubeURL?: string

  @Column({ nullable: true })
  instagramURL?: string

  @Column({ nullable: true })
  linkedInURL?: string
}
