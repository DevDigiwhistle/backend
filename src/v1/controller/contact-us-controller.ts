import { FindOptionsWhere } from 'typeorm'
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

interface IContactUsController
  extends IBaseController<
    IContactUsForm,
    IContactUsFormCRUD,
    IContactUsService
  > {
  getAllPaginated(req: Request, res: Response): Promise<Response>
}

export class ContactUsController
  extends BaseController<IContactUsForm, IContactUsFormCRUD, IContactUsService>
  implements IContactUsController
{
  constructor(contactUsService: IContactUsService) {
    super(contactUsService)
  }

  async getAllPaginated(req: Request, res: Response): Promise<Response> {
    try {
      const { brands, influencer, page, limit } = req.query

      if (typeof page !== 'string' || typeof limit !== 'string')
        throw new HttpException(400, 'Invalid Page Details')

      let query: FindOptionsWhere<IContactUsForm> = {}

      if (brands === 'true') {
        query = {
          personType: Enum.PersonType.BRAND,
        }
      }

      if (influencer === 'true') {
        query = {
          personType: Enum.PersonType.INFLUENCER,
        }
      }

      const data = await this.service.findAllPaginated(
        parseInt(page),
        parseInt(limit),
        query,
        [],
        { id: 'ASC' }
      )

      return responseHandler(200, res, 'Fetched Successfully', data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async setViewedController(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body

      if (typeof id !== 'string') throw new HttpException(400, 'Invalid Id')

      await this.service.update({ id: parseInt(id) }, { viewed: true })

      return responseHandler(200, res, 'Updated Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}
