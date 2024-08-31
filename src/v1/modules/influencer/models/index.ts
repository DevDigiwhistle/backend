import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { IUser } from '../../user/interface'
import {
  IInfluencerProfile,
  IInstagramProfileStats,
  ITwitterProfileStats,
  IYoutubeProfileStats,
} from '../interface'
import { User } from '../../user/models'
import { Campaign, CampaignParticipants } from '../../campaign/models'
import { ICampaignParticipants } from '../../campaign/interface'

@Entity()
export class InfluencerProfile implements IInfluencerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  lastName: string

  @Column({ type: 'boolean', default: false })
  exclusive: boolean

  @Column({ type: 'varchar', default: null })
  hideFrom: string

  @Column({ type: 'int', default: null })
  pay: number

  @Column({ type: 'varchar', default: null })
  niche: string

  @Column({ type: 'varchar', default: null })
  profilePic: string

  @OneToOne(() => User, (user) => user.influencerProfile, {
    eager: true,
    onDelete: 'CASCADE',
  })
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
    (twitterStats) => twitterStats.influencerProfile
  )
  twitterStats: ITwitterProfileStats

  @OneToMany(
    () => CampaignParticipants,
    (campaignParticipant) => campaignParticipant.influencerProfile
  )
  campaignParticipant: ICampaignParticipants

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}

@Entity()
export class YoutubeProfileStats implements IYoutubeProfileStats {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int', default: 0 })
  views: number

  @Column({ type: 'int', default: 0 })
  videos: number

  @Column({ type: 'int', default: 0 })
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

  @Column({ type: 'int', default: 0 })
  likes: number

  @Column({ type: 'int', default: 0 })
  comments: number

  @Column({ type: 'int', default: 0 })
  followers: number

  @Column({ type: 'decimal', default: 0 })
  engagementRate: number

  @Column({ type: 'decimal', default: 0 })
  percentageFakeFollowers: number

  @Column({ type: 'int', default: 0 })
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

  @Column({ type: 'int', default: 0 })
  followers: number

  @Column({ type: 'int', default: 0 })
  tweets: number

  @Column({ type: 'int', default: 0 })
  views: number

  @Column({ type: 'int', default: 0 })
  replyCount: number

  @Column({ type: 'int', default: 0 })
  retweets: number

  @OneToOne(
    () => InfluencerProfile,
    (influencerProfile) => influencerProfile.twitterStats
  )
  @JoinColumn({ name: 'profileId' })
  influencerProfile: InfluencerProfile

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date
}
