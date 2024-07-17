import { IBaseService } from '../../../../utils'
import { IBrandProfileCRUD } from './ICRUD'
import { IBrandProfile } from './IModels'

export interface IBrandProfileService
  extends IBaseService<IBrandProfile, IBrandProfileCRUD> {
  findByUserId(userId: string): Promise<IBrandProfile>
}
