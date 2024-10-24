import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../user/interface'
import { Enum } from '../../../../constants'
import { IPurchaseInvoice } from '../../invoice/interface'

export interface IInfluencerProfile extends ObjectLiteral {
  id: string
  firstName: string
  lastName: string
  exclusive: boolean
  hideFrom: string
  pay: number
  user: IUser
  profilePic: string | null
  niche: string | null
  twitterURL?: string | null
  youtubeURL?: string | null
  instagramURL?: string | null
  linkedInURL?: string | null
  youtubeStats?: IYoutubeProfileStats | null
  instagramStats?: IInstagramProfileStats | null
  twitterStats?: ITwitterProfileStats | null
  purchaseInvoices?: IPurchaseInvoice[] | null
  mobileNo: string
  aadharNo: string
  panNo: string
  gstNo: string
  msmeNo: string
  bankName: string
  bankAccountNumber: string
  bankIfscCode: string
  bankAccountHolderName: string
  address: string
  city: string
  state: string
  pincode: string
  fundAccountId: string | null
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
