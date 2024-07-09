import { CRUDBase } from '../../../../utils'
import { type IRole } from '../interface'
import { IRoleCRUD } from '../interface'
import { EntityTarget } from 'typeorm'

export class RoleCRUD extends CRUDBase<IRole> implements IRoleCRUD {
  constructor(role: EntityTarget<IRole>) {
    super(role)
  }
}