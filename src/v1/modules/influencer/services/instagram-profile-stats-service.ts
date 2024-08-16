import { BaseService } from '../../../../utils'
import {
  IInstagramProfileStats,
  IInstagramProfileStatsCRUD,
  IInstagramProfileStatsService,
} from '../interface'

class InstagramProfileStatsService
  extends BaseService<IInstagramProfileStats, IInstagramProfileStatsCRUD>
  implements IInstagramProfileStatsService
{
  private static instance: IInstagramProfileStatsService | null = null

  static getInstance(instagramProfileStatsCRUD: IInstagramProfileStatsCRUD) {
    if (InstagramProfileStatsService.instance === null) {
      InstagramProfileStatsService.instance = new InstagramProfileStatsService(
        instagramProfileStatsCRUD
      )
    }
    return InstagramProfileStatsService.instance
  }

  private constructor(instagramProfileStatsCRUD: IInstagramProfileStatsCRUD) {
    super(instagramProfileStatsCRUD)
  }
}

export { InstagramProfileStatsService }
