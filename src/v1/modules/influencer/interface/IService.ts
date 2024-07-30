import { IBaseService } from '../../../../utils'
import { IInfluencerProfileCRUD } from './ICRUD'
import { IInfluencerProfile } from './IModels'

export interface IInfluencerProfileService
  extends IBaseService<IInfluencerProfile, IInfluencerProfileCRUD> {}
