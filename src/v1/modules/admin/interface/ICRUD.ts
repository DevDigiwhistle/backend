import { FindOptionsOrder } from 'typeorm'
import { ICRUDBase } from '../../../../utils'
import { AddAdmin, AddEmployee } from '../types'
import { IAdminProfile } from './IModels'
import { IEmployeeProfile } from './IModels'
import { PaginatedResponse } from '../../../../utils/base-service'

export interface IAdminProfileCRUD extends ICRUDBase<IAdminProfile> {}

export interface IEmployeeProfileCRUD extends ICRUDBase<IEmployeeProfile> {}

export interface IEmployeeCRUD {
  addEmployee(data: AddEmployee): Promise<void>
}

export interface IAdminCRUD {
  addAdmin(data: AddAdmin): Promise<void>
}
