import { BaseController, errorHandler } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import {
  IBrandProfile,
  IBrandProfileCRUD,
  IBrandProfileService,
} from '../modules/brands/interface'
import { Response } from 'express'

interface IBrandProfileController
  extends IBaseController<
    IBrandProfile,
    IBrandProfileCRUD,
    IBrandProfileService
  > {
  getByUserIdController(req: IExtendedRequest, res: Response): Promise<Response>
}

export class BrandProfileController
  extends BaseController<IBrandProfile, IBrandProfileCRUD, IBrandProfileService>
  implements IBrandProfileController
{
  constructor(brandProfileService: IBrandProfileService) {
    super(brandProfileService)
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
