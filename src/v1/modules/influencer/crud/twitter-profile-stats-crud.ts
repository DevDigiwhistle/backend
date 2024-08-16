import { EntityTarget } from 'typeorm'
import { CRUDBase } from '../../../../utils'
import { ITwitterProfileStats, ITwitterProfileStatsCRUD } from '../interface'

class TwitterProfileStatsCRUD
  extends CRUDBase<ITwitterProfileStats>
  implements ITwitterProfileStatsCRUD
{
  private static instance: ITwitterProfileStatsCRUD | null = null

  static getInstance(TwitterProfileStats: EntityTarget<ITwitterProfileStats>) {
    if (TwitterProfileStatsCRUD.instance === null) {
      TwitterProfileStatsCRUD.instance = new TwitterProfileStatsCRUD(
        TwitterProfileStats
      )
    }
    return TwitterProfileStatsCRUD.instance
  }

  private constructor(TwitterProfileStats: EntityTarget<ITwitterProfileStats>) {
    super(TwitterProfileStats)
  }
}

export { TwitterProfileStatsCRUD }
