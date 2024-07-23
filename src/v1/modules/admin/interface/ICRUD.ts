import { ICRUDBase } from '../../../../utils'
import { IAdminProfile } from './IModels'
import { IEmployeeProfile } from './IModels'

export interface IAdminProfileCRUD extends ICRUDBase<IAdminProfile> {}

export interface IEmployeeProfileCRUD extends ICRUDBase<IEmployeeProfile> {}
