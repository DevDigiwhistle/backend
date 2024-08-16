import { BaseService } from '../../../../utils'
import {
  IYoutubeProfileStats,
  IYoutubeProfileStatsCRUD,
  IYoutubeProfileStatsService,
} from '../interface'

class YoutubeProfileStatsService
  extends BaseService<IYoutubeProfileStats, IYoutubeProfileStatsCRUD>
  implements IYoutubeProfileStatsService
{
  private static instance: IYoutubeProfileStatsService | null = null

  static getInstance(youtubeProfileStatsCRUD: IYoutubeProfileStatsCRUD) {
    if (YoutubeProfileStatsService.instance === null) {
      YoutubeProfileStatsService.instance = new YoutubeProfileStatsService(
        youtubeProfileStatsCRUD
      )
    }
    return YoutubeProfileStatsService.instance
  }

  private constructor(youtubeProfileStatsCRUD: IYoutubeProfileStatsCRUD) {
    super(youtubeProfileStatsCRUD)
  }
}

export { YoutubeProfileStatsService }
