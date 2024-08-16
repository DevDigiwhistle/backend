import { EntityTarget } from 'typeorm'
import { CRUDBase } from '../../../../utils'
import {
  IInstagramProfileStats,
  IInstagramProfileStatsCRUD,
} from '../interface'

class InstagramProfileStatsCRUD
  extends CRUDBase<IInstagramProfileStats>
  implements IInstagramProfileStatsCRUD
{
  private static instance: IInstagramProfileStatsCRUD | null = null

  static getInstance(
    InstagramProfileStats: EntityTarget<IInstagramProfileStats>
  ) {
    if (InstagramProfileStatsCRUD.instance === null) {
      InstagramProfileStatsCRUD.instance = new InstagramProfileStatsCRUD(
        InstagramProfileStats
      )
    }
    return InstagramProfileStatsCRUD.instance
  }

  private constructor(
    InstagramProfileStats: EntityTarget<IInstagramProfileStats>
  ) {
    super(InstagramProfileStats)
  }
}

export { InstagramProfileStatsCRUD }
