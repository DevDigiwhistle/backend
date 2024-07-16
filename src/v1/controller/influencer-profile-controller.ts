import { BaseController } from '../../utils'
import { IBaseController } from '../../utils/baseController'
import {
  IInfluencerProfile,
  IInfluencerProfileService,
} from '../modules/influencer/interface'

interface IInfluencerProfileController extends IBaseController {}

export class InfluencerProfileController
  extends BaseController<IInfluencerProfile>
  implements IInfluencerProfileController
{
  constructor(influencerProfileService: IInfluencerProfileService) {
    super(influencerProfileService)
  }
}
