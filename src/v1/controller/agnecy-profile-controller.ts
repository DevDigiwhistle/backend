import { BaseController, errorHandler } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import {
  IAgencyProfile,
  IAgencyProfileCRUD,
  IAgencyProfileService,
} from '../modules/brands/interface'
import { Response } from 'express'

interface IAgencyProfileController
  extends IBaseController<
    IAgencyProfile,
    IAgencyProfileCRUD,
    IAgencyProfileService
  > {
  getByUserIdController(req: IExtendedRequest, res: Response): Promise<Response>
}

export class AgencyProfileController
  extends BaseController<
    IAgencyProfile,
    IAgencyProfileCRUD,
    IAgencyProfileService
  >
  implements IAgencyProfileController
{
  constructor(agencyProfileService: IAgencyProfileService) {
    super(agencyProfileService)
  }

  async getByUserIdController(
    req: IExtendedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const userId = req.user.id
      const profile = await this.service.findOne({ userId: userId }, ['user'])
      return responseHandler(200, res, 'Profile fetched Successfully!!', {
        data: profile,
      })
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}
