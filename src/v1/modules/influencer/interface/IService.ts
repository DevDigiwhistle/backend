import { DeepPartial } from 'typeorm'
import { IBaseService } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import {
  IAddInfluencerInput,
  IInviteInfluencerInput,
  InfluencerByEmailResponse,
  InfluencerStats,
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
  extends IBaseService<IInfluencerProfile, IInfluencerProfileCRUD> {
  findInfluencerByEmail(email: string): Promise<InfluencerByEmailResponse[]>
  getInfluencerStats(): Promise<InfluencerStats>
}

export interface IYoutubeProfileStatsService
  extends IBaseService<IYoutubeProfileStats, IYoutubeProfileStatsCRUD> {
  addOrUpdate(data: DeepPartial<IYoutubeProfileStats>): Promise<void>
}

export interface IInstagramProfileStatsService
  extends IBaseService<IInstagramProfileStats, IInstagramProfileStatsCRUD> {
  addOrUpdate(data: DeepPartial<IInstagramProfileStats>): Promise<void>
}

export interface ITwitterProfileStatsService
  extends IBaseService<ITwitterProfileStats, ITwitterProfileStatsCRUD> {
  addOrUpdate(data: DeepPartial<ITwitterProfileStats>): Promise<void>
}

export interface IInfluencerService {
  addInfluencer(data: IAddInfluencerInput): Promise<IInfluencerProfile>
  inviteInfluencer(data: IInviteInfluencerInput): Promise<void>
  getInfluencerStats(): Promise<InfluencerStats>
  getAllInfluencer(
    page: number,
    limit: number,
    platform: string,
    type: string | undefined,
    niche: string | undefined,
    followers: string | undefined,
    name: string | undefined,
    sortEr: string | undefined,
    approved: string | undefined,
    rejected: string | undefined
  ): Promise<PaginatedResponse<IInfluencerProfile>>
  refreshAllInfluencer(
    page: number,
    limit: number,
    platform: string
  ): Promise<void>
  getAllInfluencerRequests(
    page: number,
    limit: number,
    platform: string
  ): Promise<PaginatedResponse<IInfluencerProfile>>
  getInfluencersList(): Promise<IInfluencerProfile[]>
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
