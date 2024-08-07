import { FindOptionsWhere } from 'typeorm'
import { BaseController, errorHandler, HttpException } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import { IUserService } from '../modules/auth/interface'
import {
  IAgencyProfile,
  IAgencyProfileCRUD,
  IAgencyProfileService,
} from '../modules/brands/interface'
import { Response, Request } from 'express'

interface IAgencyProfileController
  extends IBaseController<
    IAgencyProfile,
    IAgencyProfileCRUD,
    IAgencyProfileService
  > {
  getByUserIdController(req: IExtendedRequest, res: Response): Promise<Response>
  getAllAgencyController(req: Request, res: Response): Promise<Response>
}

export class AgencyProfileController
  extends BaseController<
    IAgencyProfile,
    IAgencyProfileCRUD,
    IAgencyProfileService
  >
  implements IAgencyProfileController
{
  private readonly userService: IUserService

  constructor(
    agencyProfileService: IAgencyProfileService,
    userService: IUserService
  ) {
    super(agencyProfileService)
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

  async getAllAgencyController(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit, approved, rejected } = req.query

      if (typeof page !== 'string' || typeof limit !== 'string')
        throw new HttpException(400, 'Invalid Page Details')

      let query: FindOptionsWhere<IAgencyProfile> = {}

      if (typeof approved === 'string') {
        if (approved === 'true') {
          query = {
            user: {
              isVerified: true,
            },
          }
        }
      }

      if (typeof rejected === 'string') {
        if (rejected === 'true') {
          query = {
            user: {
              isVerified: false,
            },
          }
        }
      }

      const data = await this.service.findAllPaginated(
        parseInt(page),
        parseInt(limit),
        query,
        ['user'],
        { id: 'ASC' }
      )

      return responseHandler(200, res, 'Fetched Successfully', data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}
