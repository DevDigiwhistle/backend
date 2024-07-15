import { type Request, type Response } from 'express'
import { type IBaseService } from './baseService'
import {
  type DeepPartial,
  type FindOptionsWhere,
  type ObjectLiteral
} from 'typeorm'
import { errorHandler } from './errorHandler'
import { Enum } from '../constants'
import { responseHandler } from './responseHandler'

export interface IBaseController {
  addController: (req: Request, res: Response) => Promise<Response>
  getAllController: (req: Request, res: Response) => Promise<Response>
  getByIdController: (req: Request, res: Response) => Promise<Response>
  updateController: (req: Request, res: Response) => Promise<Response>
  deleteController: (req: Request, res: Response) => Promise<Response>
}

export abstract class BaseController<T extends ObjectLiteral>
implements IBaseController {
  private readonly service: IBaseService<T>

  constructor (service: IBaseService<T>) {
    this.service = service
  }

  public async addController (req: Request, res: Response): Promise<Response> {
    try {
      const id = await this.service.add(req.body as DeepPartial<T>)
      return await responseHandler(
        Enum.RESPONSE_CODES.CREATED,
        res,
        'Created Successfully!!',
        { id }
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getAllController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.service.findAll(req.query as FindOptionsWhere<T>)
      return await responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Fetched Successfully!!',
        data
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async getByIdController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.params?.id
      if (typeof id !== 'string') {
        return res.status(400).json('Id not provided')
      }
      const query: FindOptionsWhere<T> = { id } as any
      const data = await this.service.findOne(query)
      return await responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Fetched Successfully!!',
        data
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async updateController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.params?.id
      let data: T

      if (typeof id !== 'string') {
        const query: FindOptionsWhere<T> = { id } as any
        data = await this.service.update(query, req.body as Partial<T>)
      } else {
        data = await this.service.update(
          req.query as FindOptionsWhere<T>,
          req.body as Partial<T>
        )
      }

      return await responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Updated Successfully!!',
        data
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }

  public async deleteController (
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.params?.id

      if (typeof id === 'string') {
        const query: FindOptionsWhere<T> = { id } as any
        await this.service.delete(query)
      } else {
        await this.service.delete(req.query as FindOptionsWhere<T>)
      }

      return await responseHandler(
        Enum.RESPONSE_CODES.NO_CONTENT,
        res,
        'Deleted Successfully!!',
        null
      )
    } catch (e) {
      return await errorHandler(e, res)
    }
  }
}
