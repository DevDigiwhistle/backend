import { Request, Response } from 'express';
import { IBaseService } from './baseService';
import { ObjectLiteral } from 'typeorm';
import { errorHandler } from './errorHandler';
import { Enum } from '../constants';
import { responseHandler } from './responseHandler';

export interface IBaseController {
  addController(req: Request, res: Response): Promise<Response>;
  getAllController(req: Request, res: Response): Promise<Response>;
  getByIdController(req: Request, res: Response): Promise<Response>;
  updateController(req: Request, res: Response): Promise<Response>;
  deleteController(req: Request, res: Response): Promise<Response>;
}

export abstract class BaseController<T extends ObjectLiteral> implements IBaseController{
  private readonly service: IBaseService<T>;

  constructor(service: IBaseService<T>) {
    this.service = service;
  }

  public async addController(req: Request, res: Response): Promise<Response> {
    try {
      const id = await this.service.add(req.body);
      return responseHandler(
        Enum.RESPONSE_CODES.CREATED,
        res,
        'Created Successfully!!',
        { id }
      );
    } catch (e) {
      return errorHandler(e, res);
    }
  }

  public async getAllController(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.service.findAll(req.query as any);
      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Fetched Successfully!!',
        data
      );
    } catch (e) {
      return errorHandler(e, res);
    }
  }

  public async getByIdController(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json('Id not provided');
      }

      const data = await this.service.findOne({ id } as any);
      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Fetched Successfully!!',
        data
      );
    } catch (e) {
      return errorHandler(e, res);
    }
  }

  public async updateController(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      let data: T;

      if (id) {
        data = await this.service.update({ id } as any, req.body);
      } else {
        data = await this.service.update(req.query as any, req.body);
      }

      return responseHandler(
        Enum.RESPONSE_CODES.OK,
        res,
        'Updated Successfully!!',
        data
      );
    } catch (e) {
      return errorHandler(e, res);
    }
  }

  public async deleteController(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (id) {
        await this.service.delete({ id } as any);
      } else {
        await this.service.delete(req.query as any);
      }

      return responseHandler(
        Enum.RESPONSE_CODES.NO_CONTENT,
        res,
        'Deleted Successfully!!',
        null
      );
    } catch (e) {
      return errorHandler(e, res);
    }
  }
}
