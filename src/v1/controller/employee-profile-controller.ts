import { BaseController, errorHandler, HttpException } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import {
  IEmployeeProfile,
  IEmployeeProfileCRUD,
  IEmployeeProfileService,
} from '../modules/admin/interface'
import { Request, Response } from 'express'
import { IUserService } from '../modules/auth/interface'

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
  private readonly userService: IUserService

  constructor(
    employeeProfileService: IEmployeeProfileService,
    userService: IUserService
  ) {
    super(employeeProfileService)
    this.userService = userService
  }

  async addController(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.findUserProfileByMobileNoOrUserId(
        req.body.mobileNo,
        req.body.user
      )

      if (user !== null)
        throw new HttpException(
          400,
          'user with same details already exists, pls use different details'
        )

      const data = await this.service.add(req.body)
      return responseHandler(201, res, 'Request Submitted Successfully', data)
    } catch (e) {
      return errorHandler(e, res)
    }
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
