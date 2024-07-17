import { IBaseService } from '../../../../utils'
import { IEmployeeProfileCRUD } from './ICRUD'
import { IEmployeeProfile } from './IModels'

export interface IEmployeeProfileService
  extends IBaseService<IEmployeeProfile, IEmployeeProfileCRUD> {
  findByUserId(userId: string): Promise<IEmployeeProfile>
}
