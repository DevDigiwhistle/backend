import { BaseService, HttpException } from '../../../../utils'
import { IInfluencerProfile, IInfluencerProfileCRUD } from '../interface'
import { IInfluencerProfileService } from '../interface/IService'

class InfluencerProfileService
  extends BaseService<IInfluencerProfile>
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

  async findByUserId(userId: string): Promise<IInfluencerProfile> {
    try {
      const data = await this.findOne({ userId: userId }, ['user'])

      if (data === null)
        throw new HttpException(404, 'Influencer Profile does not exits!!')

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { InfluencerProfileService }
