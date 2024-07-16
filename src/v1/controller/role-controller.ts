import { BaseController } from '../../utils'
import { IBaseController } from '../../utils/baseController'
import { IRole, IRoleService } from '../modules/auth/interface'

interface IRoleController extends IBaseController {}

export class RoleController
  extends BaseController<IRole>
  implements IRoleController
{
  constructor(roleService: IRoleService) {
    super(roleService)
  }
}
