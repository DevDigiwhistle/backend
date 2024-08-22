import { ILike } from 'typeorm'
import { BaseService, HttpException } from '../../../../utils'
import { IInfluencerProfile, IInfluencerProfileCRUD } from '../interface'
import { IInfluencerProfileService } from '../interface/IService'
import { InfluencerByEmailDTO } from '../types'

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

  async findInfluencerByEmail(email: string): Promise<InfluencerByEmailDTO[]> {
    try {
      const influencer = await this.findAll(
        {
          user: {
            email: ILike(`%${email}%`),
          },
        },
        ['user']
      )

      const data = influencer.map((item) => {
        return {
          email: item.user.email,
          profile: item.id,
        }
      })

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { InfluencerProfileService }
