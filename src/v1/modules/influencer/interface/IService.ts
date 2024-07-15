import { IBaseService } from '../../../../utils'
import { IInfluencerProfile } from './IModels'

export interface IInfluencerProfileService
  extends IBaseService<IInfluencerProfile> {
  findByUserId(userId: string): Promise<IInfluencerProfile>
}
