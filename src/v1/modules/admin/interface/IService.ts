import { IBaseService } from '../../../../utils'
import { IAdminProfile } from './IModels'

export interface IAdminProfileService extends IBaseService<IAdminProfile> {
  findByUserId(userId: string): Promise<IAdminProfile>
}
