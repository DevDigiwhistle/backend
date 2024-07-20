import { BaseController, errorHandler } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import {
  IAdminProfile,
  IAdminProfileCRUD,
  IAdminProfileService,
} from '../modules/admin/interface'
import { Request, Response } from 'express'

interface IAdminProfileController
  extends IBaseController<
    IAdminProfile,
    IAdminProfileCRUD,
    IAdminProfileService
  > {
  getByUserIdController(req: IExtendedRequest, res: Response): Promise<Response>
}

export class AdminProfileController
  extends BaseController<IAdminProfile, IAdminProfileCRUD, IAdminProfileService>
  implements IAdminProfileController
{
  constructor(adminProfileService: IAdminProfileService) {
    super(adminProfileService)
  }

  async getByUserIdController(
    req: IExtendedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const userId = req.user.id
      const profile = await this.service.findOne({ userId: userId }, ['user'])
      return responseHandler(200, res, 'Profile Found', { data: profile })
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}
