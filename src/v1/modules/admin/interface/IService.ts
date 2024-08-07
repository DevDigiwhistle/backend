import { IBaseService } from '../../../../utils'
import { AddAdmin, AddAdminOrEmployeeInput } from '../types'
import { IAdminProfileCRUD, IEmployeeProfileCRUD } from './ICRUD'
import { IAdminProfile, IEmployeeProfile } from './IModels'

export interface IAdminProfileService
  extends IBaseService<IAdminProfile, IAdminProfileCRUD> {}

export interface IEmployeeProfileService
  extends IBaseService<IEmployeeProfile, IEmployeeProfileCRUD> {}

export interface IAdminService {
  addAdmin(data: AddAdminOrEmployeeInput): Promise<void>
}

export interface IEmployeeService {
  addEmployee(data: AddAdminOrEmployeeInput): Promise<void>
}
