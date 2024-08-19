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

  private async fetchInstagramStatsAndSave(
    profileId: string,
    instagramURL: string
  ): Promise<void> {
    try {
      const instagramProfileStats =
        await this.instagramService.getInstagramProfileStats(instagramURL)

      await this.instagramProfileStatsService.addOrUpdate({
        ...instagramProfileStats,
        influencerProfile: {
          id: profileId,
        },
      })
    } catch (e) {
      await this.instagramProfileStatsService.addOrUpdate({
        influencerProfile: {
          id: profileId,
        },
      })
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  private async fetchYoutubeStatsAndSave(
    profileId: string,
    youtubeURL: string
  ): Promise<void> {
    try {
      const youtubeProfileStats =
        await this.youtubeService.getYoutubeProfileStats(youtubeURL)

      await this.youtubeProfileStatsService.addOrUpdate({
        ...youtubeProfileStats,
        influencerProfile: {
          id: profileId,
        },
      })
    } catch (e) {
      await this.youtubeProfileStatsService.addOrUpdate({
        influencerProfile: {
          id: profileId,
        },
      })
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  private async fetchTwitterStatsAndSave(
    profileId: string,
    twitterURL: string
  ): Promise<void> {
    try {
      const twitterProfileStats =
        await this.twitterService.getTwitterProfileStats(twitterURL)

      await this.twitterProfileStatsService.addOrUpdate({
        ...twitterProfileStats,
        influencerProfile: {
          id: profileId,
        },
      })
    } catch (e) {
      await this.twitterProfileStatsService.addOrUpdate({
        influencerProfile: {
          id: profileId,
        },
      })
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async fetchAllStatsAndSave(
    profileId: string,
    instagramURL: string | null | undefined,
    youtubeURL: string | null | undefined,
    twitterURL: string | null | undefined,
    linkedInURL: string | null | undefined
  ): Promise<void> {
    try {
      const promises: Promise<void>[] = []

      if (instagramURL !== null && instagramURL !== undefined) {
        promises.push(this.fetchInstagramStatsAndSave(profileId, instagramURL))
      }

      if (youtubeURL !== null && youtubeURL !== undefined) {
        promises.push(this.fetchYoutubeStatsAndSave(profileId, youtubeURL))
      }

      if (twitterURL !== null && twitterURL !== undefined) {
        promises.push(this.fetchTwitterStatsAndSave(profileId, twitterURL))
      }

      await Promise.allSettled([...promises])
    } catch (e) {
      console.log(e)
    }
  }
}

export { InfluencerStatsService }
