import { IBaseService } from '../../../../utils'
import { AddAdmin, AddAdminOrEmployeeInput, remarksDTO } from '../types'
import { IAdminProfileCRUD, IEmployeeProfileCRUD, IRemarksCRUD } from './ICRUD'
import { IAdminProfile, IEmployeeProfile, IRemarks } from './IModels'

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

export interface IRemarksService extends IBaseService<IRemarks, IRemarksCRUD> {
  findAllRemarksByUserId(userId: string): Promise<remarksDTO[]>
}
