import { IBaseService } from '../../../../utils'
import { IEmployeeProfile } from './IModels'

export interface IEmployeeProfileService
  extends IBaseService<IEmployeeProfile> {
  findByUserId(userId: string): Promise<IEmployeeProfile>
}
