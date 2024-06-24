import { AppDataSource } from '../config'
import HttpException from './HttpException'
import {
  DeepPartial,
  EntityTarget,
  ObjectLiteral,
  Repository,
  FindOptionsWhere,
} from 'typeorm'

export interface ICRUDBase<T extends ObjectLiteral> {
  add(data: DeepPartial<T>): Promise<T>
  findAll(
    query: FindOptionsWhere<T> | undefined,
    relations: string[]
  ): Promise<T[]>
  findOne(query: FindOptionsWhere<T>, relations: string[]): Promise<T>
  update(query: FindOptionsWhere<T>, data: Partial<T>): Promise<T>
  delete(query: FindOptionsWhere<T>): Promise<void>
}

export abstract class CRUDBase<T extends ObjectLiteral>
  implements ICRUDBase<T>
{
  private readonly repository: Repository<T>

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entity)
  }

  async add(data: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(data)
      return this.repository.save(entity)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

   async findAll(
    query: FindOptionsWhere<T> | undefined,
    relations: string[] = []
  ): Promise<T[]> {
    try {
      if (
        query === undefined ||
        query === null ||
        Object.keys(query).length === 0
      ) {
        const data = await this.repository.find({ relations })
        return data
      } else {
        const data = await this.repository.find({
          where: query,
          relations: relations,
        })
        return data
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

   async findOne(
    query: FindOptionsWhere<T>,
    relations: string[] = []
  ): Promise<T> {
    try {
      if (
        query === undefined ||
        query === null ||
        Object.keys(query).length === 0
      ) {
        throw new HttpException(400, 'Missing parameter')
      }

      const data = await this.repository.findOne({
        where: query,
        relations: relations,
      })

      if (data === null) throw new HttpException(404, 'Data Not Found!!')

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

   async update(
    query: FindOptionsWhere<T>,
    data: Partial<T>
  ): Promise<T> {
    try {
      if (
        query === undefined ||
        query === null ||
        Object.keys(query).length === 0
      ) {
        throw new HttpException(400, 'Missing parameter')
      }

      await this.repository.update(query, data)
      return this.findOne(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

   async delete(query: FindOptionsWhere<T>): Promise<void> {
    try {
      if (
        query === undefined ||
        query === null ||
        Object.keys(query).length === 0
      ) {
        throw new HttpException(400, 'Missing parameter')
      }

      await this.repository.delete(query)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
