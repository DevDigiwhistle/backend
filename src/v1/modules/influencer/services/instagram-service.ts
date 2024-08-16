import { HttpException } from '../../../../utils'
import { IAxiosService } from '../../../utils'
import { IInstagramService } from '../interface'
import { InstagramPostStats, InstagramProfileStats } from '../types'

class InstagramService implements IInstagramService {
  private static instance: IInstagramService | null = null
  private readonly axiosService: IAxiosService

  static getInstance = (axiosService: IAxiosService) => {
    if (InstagramService.instance === null) {
      InstagramService.instance = new InstagramService(axiosService)
    }
    return InstagramService.instance
  }

  private constructor(axiosService: IAxiosService) {
    this.axiosService = axiosService
  }

  async getInstagramProfileStats(
    profileURL: string
  ): Promise<InstagramProfileStats> {
    try {
      const data = await this.axiosService.get(
        `https://instagram-statistics-api.p.rapidapi.com/community`,
        { url: profileURL },
        {
          'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com',
          'x-rapidapi-key': process.env.INSTAGRAM_API_KEY,
        }
      )

      const _data = data.data
      const {
        avgLikes,
        avgComments,
        avgER,
        pctFakeFollowers,
        usersCount,
        avgViews,
      } = _data

      return {
        likes: avgLikes,
        comments: avgComments,
        engagementRate: avgER,
        percentageFakeFollowers: pctFakeFollowers,
        followers: usersCount,
        views: avgViews,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }

  async getInstagramPostStats(postURL: string): Promise<InstagramPostStats> {
    try {
      const data = await this.axiosService.get(
        `https://instagram-statistics-api.p.rapidapi.com/posts/one`,
        { postUrl: postURL },
        {
          'x-rapidapi-host': 'instagram-statistics-api.p.rapidapi.com',
          'x-rapidapi-key': process.env.INSTAGRAM_API_KEY,
        }
      )

      const _data = data.data
      const { likes, comments, views } = _data

      return {
        likes,
        comments,
        views,
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }
}

export { InstagramService }
