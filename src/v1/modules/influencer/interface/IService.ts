import { IBaseService } from '../../../../utils'
import {
  IAddInfluencerInput,
  IInviteInfluencerInput,
  InstagramPostStats,
  InstagramProfileStats,
  TwitterPostStats,
  TwitterProfileStats,
  YoutubePostStats,
  YoutubeProfileStats,
} from '../types'
import {
  IInfluencerProfileCRUD,
  IInstagramProfileStatsCRUD,
  ITwitterProfileStatsCRUD,
  IYoutubeProfileStatsCRUD,
} from './ICRUD'
import {
  IInfluencerProfile,
  IInstagramProfileStats,
  ITwitterProfileStats,
  IYoutubeProfileStats,
} from './IModels'

export interface IInfluencerProfileService
  extends IBaseService<IInfluencerProfile, IInfluencerProfileCRUD> {}

export interface IYoutubeProfileStatsService
  extends IBaseService<IYoutubeProfileStats, IYoutubeProfileStatsCRUD> {}

export interface IInstagramProfileStatsService
  extends IBaseService<IInstagramProfileStats, IInstagramProfileStatsCRUD> {}

export interface ITwitterProfileStatsService
  extends IBaseService<ITwitterProfileStats, ITwitterProfileStatsCRUD> {}

export interface IInfluencerService {
  addInfluencer(data: IAddInfluencerInput): Promise<IInfluencerProfile>
  inviteInfluencer(data: IInviteInfluencerInput): Promise<void>
}

export interface IInstagramService {
  getInstagramProfileStats(profileURL: string): Promise<InstagramProfileStats>
  getInstagramPostStats(postURL: string): Promise<InstagramPostStats>
}

export interface IYoutubeService {
  getYoutubeProfileStats(profileURL: string): Promise<YoutubeProfileStats>
  getYoutubePostStats(postURL: string): Promise<YoutubePostStats>
}

export interface ILinkedInService {
  getLinkedInProfileStats(profileURL: string): Promise<any>
  getLinkedInPostStats(postURL: string): Promise<any>
}

export interface ITwitterService {
  getTwitterProfileStats(profileURL: string): Promise<TwitterProfileStats>
  getTwitterPostStats(postURL: string): Promise<TwitterPostStats>
}

export interface IInfluencerStatsService {
  fetchAllStatsAndSave(
    profileId: string,
    instagramURL: string | null | undefined,
    youtubeURL: string | null | undefined,
    twitterURL: string | null | undefined,
    linkedInURL: string | null | undefined
  ): Promise<void>
}
