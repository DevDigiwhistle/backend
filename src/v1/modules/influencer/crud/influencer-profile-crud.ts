import { EntityTarget, ILike } from 'typeorm'
import { CRUDBase, HttpException } from '../../../../utils'
import { IInfluencerProfile, IInfluencerProfileCRUD } from '../interface'

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
}

export { InfluencerProfileCRUD }
