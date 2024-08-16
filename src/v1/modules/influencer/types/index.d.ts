export interface IAddInfluencerInput {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  twitterURL?: string
  youtubeURL?: string
  instagramURL?: string
  linkedInURL?: string
}

export interface IAddInfluencer extends IAddInfluencerInput {
  userId: string
}

export interface IInviteInfluencerInput {
  emails: string[]
  message: string
  subject: string
}

export type InstagramProfileStats = {
  likes: number
  comments: number
  followers: number
  engagementRate: number
  percentageFakeFollowers: number
  views: number
}

export type InstagramPostStats = {
  likes: number
  comments: number
  views: number
}

export type YoutubePostStats = {
  likes: number
  comments: number
  views: number
}

export type YoutubeProfileStats = {
  views: number
  subscribers: number
  videos: number
}

export type TwitterProfileStats = {
  followers: number
  tweets: number
  views: number
  replyCount: number
  retweets: number
}

export type TwitterPostStats = {
  views: number
  replyCount: number
  retweets: number
}
