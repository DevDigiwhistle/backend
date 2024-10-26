import { IBaseService } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import { IAgencyProfileCRUD, IBrandProfileCRUD } from './ICRUD'
import { IAgencyProfile, IBrandProfile } from './IModels'

export interface IBrandProfileService
  extends IBaseService<IBrandProfile, IBrandProfileCRUD> {
  getAllBrands(
    page: number,
    limit: number,
    approved?: string,
    rejected?: string,
    name?: string
  ): Promise<PaginatedResponse<IBrandProfile>>
  findBrandsByName(name: string): Promise<IBrandProfile[]>
  getBrandsList(): Promise<IBrandProfile[]>
}

export interface IAgencyProfileService
  extends IBaseService<IAgencyProfile, IAgencyProfileCRUD> {
  getAllAgencies(
    page: number,
    limit: number,
    approved?: string,
    rejected?: string,
    name?: string
  ): Promise<PaginatedResponse<IAgencyProfile>>
}
