import { errorHandler } from '../../utils'
import { responseHandler } from '../../utils/response-handler'
import {
  IInfluencerService,
  IInfluencerStatsService,
} from '../modules/influencer/interface'
import { Request, Response } from 'express'

class InfluencerController {
  private readonly influencerService: IInfluencerService
  private readonly influencerStatsService: IInfluencerStatsService

  constructor(
    influencerService: IInfluencerService,
    influencerStatsService: IInfluencerStatsService
  ) {
    this.influencerService = influencerService
    this.influencerStatsService = influencerStatsService
  }

  async addInfluencerController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.influencerService.addInfluencer(req.body)

      const { instagramURL, youtubeURL, linkedInURL, twitterURL } = data

      // this.influencerStatsService.fetchAllStatsAndSave(
      //   data.id,
      //   instagramURL,
      //   youtubeURL,
      //   twitterURL,
      //   linkedInURL
      // )

      return responseHandler(200, res, 'Added Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async inviteInfluencerController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.influencerService.inviteInfluencer(req.body)
      return responseHandler(200, res, 'Invited Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { InfluencerController }
