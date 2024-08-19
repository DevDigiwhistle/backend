import { DeepPartial } from 'typeorm'
import { ICRUDBase } from '../../../../utils'
import { IAddInfluencer } from '../types'
import {
  IInfluencerProfile,
  IInstagramProfileStats,
  ITwitterProfileStats,
  IYoutubeProfileStats,
} from './IModels'

export interface IInfluencerProfileCRUD extends ICRUDBase<IInfluencerProfile> {}

export interface IInstagramProfileStatsCRUD
  extends ICRUDBase<IInstagramProfileStats> {
  addOrUpdate(data: DeepPartial<IInstagramProfileStats>): Promise<void>
}

export interface IYoutubeProfileStatsCRUD
  extends ICRUDBase<IYoutubeProfileStats> {
  addOrUpdate(data: DeepPartial<IYoutubeProfileStats>): Promise<void>
}

export interface ITwitterProfileStatsCRUD
  extends ICRUDBase<ITwitterProfileStats> {
  addOrUpdate(data: DeepPartial<ITwitterProfileStats>): Promise<void>
}

export interface IInfluencerCRUD {
  addInfluencer(data: IAddInfluencer): Promise<IInfluencerProfile>
}
