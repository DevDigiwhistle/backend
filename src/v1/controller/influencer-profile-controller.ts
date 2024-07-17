import { BaseController, errorHandler } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import {
  IInfluencerProfile,
  IInfluencerProfileCRUD,
  IInfluencerProfileService,
} from '../modules/influencer/interface'
import { Response } from 'express'

interface IInfluencerProfileController
  extends IBaseController<
    IInfluencerProfile,
    IInfluencerProfileCRUD,
    IInfluencerProfileService
  > {}

export class InfluencerProfileController
  extends BaseController<
    IInfluencerProfile,
    IInfluencerProfileCRUD,
    IInfluencerProfileService
  >
  implements IInfluencerProfileController
{
  constructor(influencerProfileService: IInfluencerProfileService) {
    super(influencerProfileService)
  }

  async getByUserIdController(
    req: IExtendedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const userId = req.user.id
      const profile = await this.service.findOne({ userId: userId }, ['user'])
      return responseHandler(
        200,
        res,
        'Profile fetched Successfully!!',
        profile
      )
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}
