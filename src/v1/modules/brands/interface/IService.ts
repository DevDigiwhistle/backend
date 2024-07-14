import { IBaseService } from '../../../../utils'
import { IBrandProfile } from './IModels'

export interface IBrandProfileService extends IBaseService<IBrandProfile> {
  findByUserId(userId: string): Promise<IBrandProfile>
}
