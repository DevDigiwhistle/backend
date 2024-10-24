import { FindOptionsWhere, ILike } from 'typeorm'
import { BaseController, errorHandler, HttpException } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import {
  IContactUsForm,
  IContactUsFormCRUD,
  IContactUsService,
} from '../modules/landing/interface'
import { Request, Response } from 'express'
import { Enum } from '../../constants'
import { responseHandler } from '../../utils/response-handler'

export class ContactUsController extends BaseController<
  IContactUsForm,
  IContactUsFormCRUD,
  IContactUsService
> {
  constructor(contactUsService: IContactUsService) {
    super(contactUsService)
  }

  async getAllPaginated(req: Request, res: Response): Promise<Response> {
    try {
      const { brands, influencer, page, limit, name } = req.query

      if (typeof page !== 'string' || typeof limit !== 'string')
        throw new HttpException(400, 'Invalid Page Details')

      const data = await this.service.findAllContactUs(
        parseInt(page),
        parseInt(limit),
        name as string,
        brands as string,
        influencer as string
      )

      return responseHandler(200, res, 'Fetched Successfully', data, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async setViewedController(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body

      if (typeof id !== 'number') throw new HttpException(400, 'Invalid Id')

      await this.service.update({ id: id }, { viewed: true })

      return responseHandler(200, res, 'Updated Successfully', {}, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }
}
