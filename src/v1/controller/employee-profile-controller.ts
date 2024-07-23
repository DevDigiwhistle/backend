import { BaseController, errorHandler } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import {
  IEmployeeProfile,
  IEmployeeProfileCRUD,
  IEmployeeProfileService,
} from '../modules/admin/interface'
import { Response } from 'express'

interface IEmployeeProfileController
  extends IBaseController<
    IEmployeeProfile,
    IEmployeeProfileCRUD,
    IEmployeeProfileService
  > {
  getByUserIdController(req: IExtendedRequest, res: Response): Promise<Response>
}

export class EmployeeProfileController
  extends BaseController<
    IEmployeeProfile,
    IEmployeeProfileCRUD,
    IEmployeeProfileService
  >
  implements IEmployeeProfileController
{
  constructor(employeeProfileService: IEmployeeProfileService) {
    super(employeeProfileService)
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
