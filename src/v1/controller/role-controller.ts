import { BaseController } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import { IRole, IRoleCRUD, IRoleService } from '../modules/user/interface'

interface IRoleController
  extends IBaseController<IRole, IRoleCRUD, IRoleService> {}

export class RoleController
  extends BaseController<IRole, IRoleCRUD, IRoleService>
  implements IRoleController
{
  constructor(roleService: IRoleService) {
    super(roleService)
  }
}
