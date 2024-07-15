import { type ObjectLiteral } from 'typeorm'
import { IUser } from '../../auth/interface'

export interface IInfluencerProfile extends ObjectLiteral {
  id: string
  firstName: string
  lastName: string
  userId?: string
  user: IUser
  twitterURL?: string
  youtubeURL?: string
  instagramURL?: string
  linkedInURL?: string
}
