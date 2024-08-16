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
  extends ICRUDBase<IInstagramProfileStats> {}

export interface IYoutubeProfileStatsCRUD
  extends ICRUDBase<IYoutubeProfileStats> {}

export interface ITwitterProfileStatsCRUD
  extends ICRUDBase<ITwitterProfileStats> {}

export interface IInfluencerCRUD {
  addInfluencer(data: IAddInfluencer): Promise<IInfluencerProfile>
}
