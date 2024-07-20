import { IBaseService } from '../../../../utils'
import { IAgencyProfileCRUD, IBrandProfileCRUD } from './ICRUD'
import { IAgencyProfile, IBrandProfile } from './IModels'

export interface IBrandProfileService
  extends IBaseService<IBrandProfile, IBrandProfileCRUD> {
  findByUserId(userId: string): Promise<IBrandProfile>
}

export interface IAgencyProfileService
  extends IBaseService<IAgencyProfile, IAgencyProfileCRUD> {
  findByUserId(userId: string): Promise<IAgencyProfile>
}
