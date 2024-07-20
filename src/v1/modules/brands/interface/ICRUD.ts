import { ICRUDBase } from '../../../../utils'
import { IAgencyProfile, IBrandProfile } from './IModels'

export interface IBrandProfileCRUD extends ICRUDBase<IBrandProfile> {}

export interface IAgencyProfileCRUD extends ICRUDBase<IAgencyProfile> {}
