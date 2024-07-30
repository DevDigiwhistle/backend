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
}

export { AgencyProfileService }
