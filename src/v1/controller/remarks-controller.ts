import {
  BaseController,
  errorHandler,
  HttpException,
  IBaseController,
} from '../../utils'
import { responseHandler } from '../../utils/response-handler'
import { IExtendedRequest } from '../interface'
import {
  IRemarks,
  IRemarksCRUD,
  IRemarksService,
} from '../modules/admin/interface'
import { Request, Response } from 'express'

interface IRemarksController
  extends IBaseController<IRemarks, IRemarksCRUD, IRemarksService> {
  getRemarksByUserIdController(req: Request, res: Response): Promise<Response>
}

class RemarksController
  extends BaseController<IRemarks, IRemarksCRUD, IRemarksService>
  implements IRemarksController
{
  private readonly remarksService: IRemarksService

  constructor(remarksService: IRemarksService) {
    super(remarksService)
  }

  async addController(req: IExtendedRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user.id
      const data = await this.service.add({ remarker: userId, ...req.body })
      return responseHandler(201, res, 'Added Successfully', data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async getRemarksByUserIdController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { userId } = req.query

      if (typeof userId !== 'string')
        throw new HttpException(400, 'Invalid UserId')

      const data = await this.service.findAllRemarksByUserId(userId)
      return responseHandler(200, res, 'Fetched Successfully', data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { RemarksController }
