import { IBaseService } from '../../../../utils'
import { IAdminProfileCRUD, IEmployeeProfileCRUD } from './ICRUD'
import { IAdminProfile, IEmployeeProfile } from './IModels'

export interface IAdminProfileService
  extends IBaseService<IAdminProfile, IAdminProfileCRUD> {}

export interface IEmployeeProfileService
  extends IBaseService<IEmployeeProfile, IEmployeeProfileCRUD> {}
