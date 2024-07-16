import { BaseController } from '../../utils'
import { IBaseController } from '../../utils/baseController'
import { IAdminProfile, IAdminProfileService } from '../modules/admin/interface'

interface IAdminProfileController extends IBaseController {}

export class AdminProfileController
  extends BaseController<IAdminProfile>
  implements IAdminProfileController
{
  constructor(adminProfileService: IAdminProfileService) {
    super(adminProfileService)
  }
}
