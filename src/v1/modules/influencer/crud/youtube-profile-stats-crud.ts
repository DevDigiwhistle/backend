import { EntityTarget } from 'typeorm'
import { CRUDBase } from '../../../../utils'
import { IYoutubeProfileStats, IYoutubeProfileStatsCRUD } from '../interface'

class YoutubeProfileStatsCRUD
  extends CRUDBase<IYoutubeProfileStats>
  implements IYoutubeProfileStatsCRUD
{
  private static instance: IYoutubeProfileStatsCRUD | null = null

  static getInstance(YoutubeProfileStats: EntityTarget<IYoutubeProfileStats>) {
    if (YoutubeProfileStatsCRUD.instance === null) {
      YoutubeProfileStatsCRUD.instance = new YoutubeProfileStatsCRUD(
        YoutubeProfileStats
      )
    }
    return YoutubeProfileStatsCRUD.instance
  }

  private constructor(YoutubeProfileStats: EntityTarget<IYoutubeProfileStats>) {
    super(YoutubeProfileStats)
  }
}

export { YoutubeProfileStatsCRUD }
