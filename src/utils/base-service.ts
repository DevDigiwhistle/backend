import {
  type ObjectLiteral,
  type DeepPartial,
  type FindOptionsWhere,
} from 'typeorm'
import { type ICRUDBase } from './base-crud'
import HttpException from './http-exception'

export interface IBaseService<T extends ObjectLiteral, C extends ICRUDBase<T>> {
  add: (data: DeepPartial<T>) => Promise<T>
  findAll: (
    query: FindOptionsWhere<T> | undefined,
    relations?: string[]
  ) => Promise<T[]>
  findOne: (
    query: FindOptionsWhere<T>,
    relations?: string[]
  ) => Promise<T | null>
  update: (query: FindOptionsWhere<T>, data: Partial<T>) => Promise<T>
  delete: (query: FindOptionsWhere<T>) => Promise<void>
}

export abstract class BaseService<
  T extends ObjectLiteral,
  C extends ICRUDBase<T>,
> implements IBaseService<T, C>
{
  protected readonly crudBase: C

  constructor(crudBase: C) {
    this.crudBase = crudBase
  }

  async add(data: DeepPartial<T>): Promise<T> {
    try {
      const results = await this.crudBase.add(data)
      return results
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findAll(
    query: FindOptionsWhere<T> | undefined,
    relations: string[] = []
  ): Promise<T[]> {
    try {
      return await this.crudBase.findAll(query, relations)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async findOne(
    query: FindOptionsWhere<T>,
    relations: string[] = []
  ): Promise<T | null> {
    try {
      const data = await this.crudBase.findOne(query, relations)

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async update(query: FindOptionsWhere<T>, data: Partial<T>): Promise<T> {
    try {
      const results = await this.crudBase.update(query, data)
      return results
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async delete(query: FindOptionsWhere<T>): Promise<void> {
    try {
      await this.crudBase.delete(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
