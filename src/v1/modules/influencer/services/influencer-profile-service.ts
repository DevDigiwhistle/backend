import { BaseService, HttpException } from '../../../../utils'
import { IInfluencerProfile, IInfluencerProfileCRUD } from '../interface'
import { IInfluencerProfileService } from '../interface/IService'

class InfluencerProfileService
  extends BaseService<IInfluencerProfile, IInfluencerProfileCRUD>
  implements IInfluencerProfileService
{
  private static instance: IInfluencerProfileService | null = null

  static getInstance(InfluencerProfileCRUD: IInfluencerProfileCRUD) {
    if (InfluencerProfileService.instance === null) {
      InfluencerProfileService.instance = new InfluencerProfileService(
        InfluencerProfileCRUD
      )
    }

    return InfluencerProfileService.instance
  }

  private constructor(influencerProfileCRUD: IInfluencerProfileCRUD) {
    super(influencerProfileCRUD)
  }
}

export { InfluencerProfileService }
