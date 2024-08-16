import { BaseService } from '../../../../utils'
import {
  ITwitterProfileStats,
  ITwitterProfileStatsCRUD,
  ITwitterProfileStatsService,
} from '../interface'

class TwitterProfileStatsService
  extends BaseService<ITwitterProfileStats, ITwitterProfileStatsCRUD>
  implements ITwitterProfileStatsService
{
  private static instance: ITwitterProfileStatsService | null = null

  static getInstance(twitterProfileStatsCRUD: ITwitterProfileStatsCRUD) {
    if (TwitterProfileStatsService.instance === null) {
      TwitterProfileStatsService.instance = new TwitterProfileStatsService(
        twitterProfileStatsCRUD
      )
    }
    return TwitterProfileStatsService.instance
  }

  private constructor(twitterProfileStatsCRUD: ITwitterProfileStatsCRUD) {
    super(twitterProfileStatsCRUD)
  }
}

export { TwitterProfileStatsService }
