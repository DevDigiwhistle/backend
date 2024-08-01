import { BaseController, errorHandler, HttpException } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import { IUserService } from '../modules/auth/interface'
import {
  IBrandProfile,
  IBrandProfileCRUD,
  IBrandProfileService,
} from '../modules/brands/interface'
import { Request, Response } from 'express'

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
  private readonly userService: IUserService

  constructor(
    brandProfileService: IBrandProfileService,
    userService: IUserService
  ) {
    super(brandProfileService)
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
