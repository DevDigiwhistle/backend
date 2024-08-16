import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../auth/interface'

export interface IInfluencerProfile extends ObjectLiteral {
  id: string
  firstName: string
  lastName: string
  userId?: string
  user: IUser
  twitterURL?: string | null
  youtubeURL?: string | null
  instagramURL?: string | null
  linkedInURL?: string | null
  youtubeStats?: IYoutubeProfileStats | null
  instagramStats?: IInstagramProfileStats | null
  twitterStats?: ITwitterProfileStats | null
  mobileNo: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IInstagramProfileStats extends ObjectLiteral {
  id: string
  likes: number
  comments: number
  followers: number
  engagementRate: number
  percentageFakeFollowers: number
  views: number
  influencerProfile: IInfluencerProfile
  createdAt?: Date
  updatedAt?: Date
}

export interface IYoutubeProfileStats extends ObjectLiteral {
  id: string
  views: number
  videos: number
  subscribers: number
  influencerProfile: IInfluencerProfile
  createdAt?: Date
  updatedAt?: Date
}

export interface ITwitterProfileStats extends ObjectLiteral {
  id: string
  followers: number
  tweets: number
  views: number
  replyCount: number
  retweets: number
  influencerProfile: IInfluencerProfile
  createdAt?: Date
  updatedAt?: Date
}
