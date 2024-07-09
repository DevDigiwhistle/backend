import { BaseService } from '../../../../utils'
import { IRole, IRoleService } from '../interface'
import { IRoleCRUD } from '../interface'

class RoleService extends BaseService<IRole> implements IRoleService {
  constructor(roleCRUD: IRoleCRUD) {
    super(roleCRUD)
  }
}
export { RoleService }
