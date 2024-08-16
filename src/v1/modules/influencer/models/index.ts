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
import {
  IInfluencerProfile,
  IInstagramProfileStats,
  ITwitterProfileStats,
  IYoutubeProfileStats,
} from '../interface'
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
  twitterURL: string

  @Column({ type: 'varchar', nullable: true })
  youtubeURL: string

  @Column({ type: 'varchar', nullable: true })
  instagramURL: string

  @Column({ type: 'varchar', nullable: true })
  linkedInURL: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  mobileNo: string

  @OneToOne(
    () => InstagramProfileStats,
    (instagramStats) => instagramStats.influencerProfile,
    { nullable: true }
  )
  instagramStats: IInstagramProfileStats

  @OneToOne(
    () => YoutubeProfileStats,
    (youtubeStats) => youtubeStats.influencerProfile,
    { nullable: true }
  )
  youtubeStats: IYoutubeProfileStats

  @OneToOne(
    () => TwitterProfileStats,
    (twitterStats) => twitterStats.influencerProfile,
    { nullable: true }
  )
  twitterStats: ITwitterProfileStats

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class YoutubeProfileStats implements IYoutubeProfileStats {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int' })
  views: number

  @Column({ type: 'int' })
  videos: number

  @Column({ type: 'int' })
  subscribers: number

  @OneToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.youtubeStats
  )
  @JoinColumn({ name: 'profileId' })
  influencerProfile: InfluencerProfile

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class InstagramProfileStats implements IInstagramProfileStats {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int' })
  likes: number

  @Column({ type: 'int' })
  comments: number

  @Column({ type: 'int' })
  followers: number

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  engagementRate: number

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentageFakeFollowers: number

  @Column({ type: 'int' })
  views: number

  @OneToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.instagramStats
  )
  @JoinColumn({ name: 'profileId' })
  influencerProfile: InfluencerProfile

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class TwitterProfileStats implements ITwitterProfileStats {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int' })
  followers: number

  @Column({ type: 'int' })
  tweets: number

  @Column({ type: 'int' })
  views: number

  @Column({ type: 'int' })
  replyCount: number

  @Column({ type: 'int' })
  retweets: number

  @OneToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.twitterStats
  )
  influencerProfile: InfluencerProfile

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
