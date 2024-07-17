import { IBaseService } from '../../../../utils'
import { IAdminProfileCRUD } from './ICRUD'
import { IAdminProfile } from './IModels'

export interface IAdminProfileService
  extends IBaseService<IAdminProfile, IAdminProfileCRUD> {}
