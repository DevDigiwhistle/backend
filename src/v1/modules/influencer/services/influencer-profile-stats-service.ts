import { HttpException } from '../../../../utils'
import {
  IInfluencerStatsService,
  IInstagramProfileStatsService,
  IInstagramService,
  ITwitterProfileStatsService,
  ITwitterService,
  IYoutubeProfileStatsService,
  IYoutubeService,
} from '../interface'

class InfluencerStatsService implements IInfluencerStatsService {
  private static instance: IInfluencerStatsService | null = null
  private readonly instagramService: IInstagramService
  private readonly youtubeService: IYoutubeService
  private readonly twitterService: ITwitterService
  private readonly instagramProfileStatsService: IInstagramProfileStatsService
  private readonly youtubeProfileStatsService: IYoutubeProfileStatsService
  private readonly twitterProfileStatsService: ITwitterProfileStatsService

  static getInstance(
    instagramService: IInstagramService,
    youtubeService: IYoutubeService,
    twitterService: ITwitterService,
    instagramProfileStatsService: IInstagramProfileStatsService,
    youtubeProfileStatsService: IYoutubeProfileStatsService,
    twitterProfileStatsService: ITwitterProfileStatsService
  ) {
    if (InfluencerStatsService.instance === null) {
      InfluencerStatsService.instance = new InfluencerStatsService(
        instagramService,
        youtubeService,
        twitterService,
        instagramProfileStatsService,
        youtubeProfileStatsService,
        twitterProfileStatsService
      )
    }
    return InfluencerStatsService.instance
  }

  private constructor(
    instagramService: IInstagramService,
    youtubeService: IYoutubeService,
    twitterService: ITwitterService,
    instagramProfileStatsService: IInstagramProfileStatsService,
    youtubeProfileStatsService: IYoutubeProfileStatsService,
    twitterProfileStatsService: ITwitterProfileStatsService
  ) {
    this.instagramService = instagramService
    this.youtubeService = youtubeService
    this.twitterService = twitterService
    this.youtubeProfileStatsService = youtubeProfileStatsService
    this.instagramProfileStatsService = instagramProfileStatsService
    this.twitterProfileStatsService = twitterProfileStatsService
  }

  async fetchAllStatsAndSave(
    profileId: string,
    instagramURL: string | null | undefined,
    youtubeURL: string | null | undefined,
    twitterURL: string | null | undefined,
    linkedInURL: string | null | undefined
  ): Promise<void> {
    try {
      if (instagramURL !== null && instagramURL !== undefined) {
        const instagramProfileStats =
          await this.instagramService.getInstagramProfileStats(instagramURL)

        await this.instagramProfileStatsService.add({
          ...instagramProfileStats,
          influencerProfile: {
            id: profileId,
          },
        })
      }

      if (youtubeURL !== null && youtubeURL !== undefined) {
        const youtubeProfileStats =
          await this.youtubeService.getYoutubeProfileStats(youtubeURL)

        await this.youtubeProfileStatsService.add({
          ...youtubeProfileStats,
          influencerProfile: {
            id: profileId,
          },
        })
      }

      if (twitterURL !== null && twitterURL !== undefined) {
        const twitterProfileStats =
          await this.twitterService.getTwitterProfileStats(twitterURL)

        await this.twitterProfileStatsService.add({
          ...twitterProfileStats,
          influencerProfile: {
            id: profileId,
          },
        })
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { InfluencerStatsService }
