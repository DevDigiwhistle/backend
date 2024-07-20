import { BaseService, HttpException } from '../../../../utils'
import {
  IAgencyProfile,
  IAgencyProfileCRUD,
  IAgencyProfileService,
} from '../interface'

class AgencyProfileService
  extends BaseService<IAgencyProfile, IAgencyProfileCRUD>
  implements IAgencyProfileService
{
  private static instance: IAgencyProfileService | null = null

  static getInstance(agencyProfileCRUD: IAgencyProfileCRUD) {
    if (AgencyProfileService.instance === null) {
      AgencyProfileService.instance = new AgencyProfileService(
        agencyProfileCRUD
      )
    }

    return AgencyProfileService.instance
  }

  private constructor(agencyProfileCRUD: IAgencyProfileCRUD) {
    super(agencyProfileCRUD)
  }

  async findByUserId(userId: string): Promise<IAgencyProfile> {
    try {
      const data = await this.findOne({ userId: userId }, ['user'])

      if (data === null)
        throw new HttpException(404, 'Agency Profile does not exits!!')

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { AgencyProfileService }
