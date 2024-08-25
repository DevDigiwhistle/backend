import { EntityTarget, ILike } from 'typeorm'
import { CRUDBase, HttpException } from '../../../../utils'
import { IInfluencerProfile, IInfluencerProfileCRUD } from '../interface'
import { InfluencerStatsDTO } from '../types'

class InfluencerProfileCRUD
  extends CRUDBase<IInfluencerProfile>
  implements IInfluencerProfileCRUD
{
  private static instance: IInfluencerProfileCRUD | null = null

  static getInstance(influencerProfile: EntityTarget<IInfluencerProfile>) {
    if (InfluencerProfileCRUD.instance === null) {
      InfluencerProfileCRUD.instance = new InfluencerProfileCRUD(
        influencerProfile
      )
    }
    return InfluencerProfileCRUD.instance
  }

  private constructor(influencerProfile: EntityTarget<IInfluencerProfile>) {
    super(influencerProfile)
  }

  async getInfluencerStats(): Promise<InfluencerStatsDTO> {
    try {
      const result = await this.repository
        .createQueryBuilder('InfluencerProfile')
        .select([
          'SUM(CASE WHEN InfluencerProfile.exclusive IS TRUE THEN 1 ELSE 0 END) AS exclusive',
          'SUM(CASE WHEN InfluencerProfile.exclusive IS FALSE THEN 1 ELSE 0 END) AS nonexclusive',
        ])
        .getRawOne()

      return result
    } catch (e) {
      console.log(e)
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { InfluencerProfileCRUD }
