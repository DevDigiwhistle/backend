import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  IsNull,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm'
import { HttpException } from '../../../../utils'
import { IMailerService } from '../../../utils'
import { IGoogleAuthService } from '../../auth/interface'
import {
  IInfluencerService,
  IInfluencerCRUD,
  IInfluencerProfile,
  IInfluencerProfileCRUD,
  IInfluencerProfileService,
  IInfluencerStatsService,
} from '../interface'
import { IAddInfluencerInput, IInviteInfluencerInput } from '../types'
import { PaginatedResponse } from '../../../../utils/base-service'

class InfluencerService implements IInfluencerService {
  private readonly mailerService: IMailerService
  private readonly googleAuthService: IGoogleAuthService
  private readonly influencerCRUD: IInfluencerCRUD
  private readonly influencerProfileService: IInfluencerProfileService
  private readonly influencerStatsService: IInfluencerStatsService
  private static instance: IInfluencerService | null = null

  static getInstance = (
    mailerService: IMailerService,
    googleAuthService: IGoogleAuthService,
    influencerCRUD: IInfluencerCRUD,
    influencerProfileService: IInfluencerProfileService,
    influencerStatsService: IInfluencerStatsService
  ) => {
    if (InfluencerService.instance === null) {
      InfluencerService.instance = new InfluencerService(
        mailerService,
        googleAuthService,
        influencerCRUD,
        influencerProfileService,
        influencerStatsService
      )
    }
    return InfluencerService.instance
  }

  private constructor(
    mailerService: IMailerService,
    googleAuthService: IGoogleAuthService,
    influencerCRUD: IInfluencerCRUD,
    influencerProfileService: IInfluencerProfileService,
    influencerStatsService: IInfluencerStatsService
  ) {
    this.mailerService = mailerService
    this.googleAuthService = googleAuthService
    this.influencerCRUD = influencerCRUD
    this.influencerProfileService = influencerProfileService
    this.influencerStatsService = influencerStatsService
  }

  async addInfluencer(data: IAddInfluencerInput): Promise<IInfluencerProfile> {
    try {
      const { uid } = await this.googleAuthService.createUser(data.email)

      const _data = await this.influencerCRUD.addInfluencer({
        ...data,
        userId: uid,
      })

      this.mailerService.sendMail(
        data.email,
        'You are invited to Join Digiwhistle',
        ''
      )

      return _data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }

  async inviteInfluencer(data: IInviteInfluencerInput): Promise<void> {
    try {
      this.mailerService.sendMail(data.emails, data.subject, data.message)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }

  async refreshAllInfluencer(
    page: number,
    limit: number,
    platform: string
  ): Promise<void> {
    try {
      const data = await this.influencerProfileService.findAllPaginated(
        page,
        limit,
        undefined,
        [],
        { createdAt: 'DESC' }
      )

      const promises: Promise<void>[] = []

      data.data.forEach((value) => {
        if (platform === 'instagram') {
          promises.push(
            this.influencerStatsService.fetchAllStatsAndSave(
              value.id,
              value.instagramURL,
              undefined,
              undefined,
              undefined
            )
          )
        }
        if (platform === 'youtube') {
          promises.push(
            this.influencerStatsService.fetchAllStatsAndSave(
              value.id,
              undefined,
              value.youtubeURL,
              undefined,
              undefined
            )
          )
        }
        if (platform === 'x') {
          promises.push(
            this.influencerStatsService.fetchAllStatsAndSave(
              value.id,
              undefined,
              undefined,
              value.twitterURL,
              undefined
            )
          )
        }
      })

      await Promise.allSettled(promises)
    } catch (e) {
      console.log(e)
    }
  }

  async getAllInfluencer(
    page: number,
    limit: number,
    platform: string,
    type: string | undefined,
    niche: string | undefined,
    followers: string | undefined,
    name: string | undefined,
    sortEr: string | undefined,
    approved: string | undefined,
    rejected: string | undefined
  ): Promise<PaginatedResponse<IInfluencerProfile>> {
    try {
      let orQuery: FindOptionsWhere<IInfluencerProfile>[] = []
      let query: FindOptionsWhere<IInfluencerProfile> = {}

      const relation: string[] = ['user']
      let order: FindOptionsOrder<IInfluencerProfile> = {
        createdAt: 'DESC',
      }

      if (platform === 'instagram' && sortEr === 'true') {
        order = {
          instagramStats: {
            engagementRate: 'DESC',
          },
        }
      }

      if (approved === 'true') {
        orQuery.push({
          user: {
            isApproved: true,
          },
        })
      }

      if (rejected === 'true') {
        orQuery.push({
          user: {
            isApproved: false,
          },
        })
      }

      if (type === 'exclusive') {
        query = { ...query, exclusive: true }
      }

      if (type === 'non-exclusive') {
        query = {
          ...query,
          exclusive: false,
        }
      }

      if (typeof name === 'string') {
        query = {
          ...query,
          firstName: ILike(`${name}`),
        }
      }

      if (niche === 'finance') {
        query = {
          ...query,
          niche: niche,
        }
      }

      if (niche === 'non-finance') {
        query = {
          ...query,
          niche: Not('finance'),
        }
      }

      if (platform === 'instagram') {
        if (followers === 'lessThan250k') {
          query = {
            ...query,
            instagramStats: {
              id: Not(IsNull()),
              followers: LessThanOrEqual(250000),
            },
          }
        } else if (followers === '250kTo500k') {
          query = {
            ...query,
            instagramStats: {
              id: Not(IsNull()),
              followers: Between(250000, 500000),
            },
          }
        } else if (followers === '500kTo750k') {
          query = {
            ...query,
            instagramStats: {
              id: Not(IsNull()),
              followers: Between(500000, 750000),
            },
          }
        } else if (followers === 'moreThan750k') {
          query = {
            ...query,
            instagramStats: {
              id: Not(IsNull()),
              followers: MoreThanOrEqual(750000),
            },
          }
        } else {
          query = {
            ...query,
            instagramStats: {
              id: Not(IsNull()),
            },
          }
        }

        relation.push('instagramStats')
      }

      if (platform === 'youtube') {
        if (followers === 'lessThan250k') {
          query = {
            ...query,
            youtubeStats: {
              id: Not(IsNull()),
              subscribers: LessThanOrEqual(250000),
            },
          }
        } else if (followers === '250kTo500k') {
          query = {
            ...query,
            youtubeStats: {
              id: Not(IsNull()),
              subscribers: Between(250000, 500000),
            },
          }
        } else if (followers === '500kTo750k') {
          query = {
            ...query,
            youtubeStats: {
              id: Not(IsNull()),
              subscribers: Between(500000, 750000),
            },
          }
        } else if (followers === 'moreThan750k') {
          query = {
            ...query,
            youtubeStats: {
              id: Not(IsNull()),
              subscribers: MoreThanOrEqual(750000),
            },
          }
        } else {
          query = {
            ...query,
            youtubeStats: {
              id: Not(IsNull()),
            },
          }
        }

        relation.push('youtubeStats')
      }

      if (platform === 'x') {
        if (followers === 'lessThan250k') {
          query = {
            ...query,
            twitterStats: {
              id: Not(IsNull()),
              followers: LessThanOrEqual(250000),
            },
          }
        } else if (followers === '250kTo500k') {
          query = {
            ...query,
            twitterStats: {
              id: Not(IsNull()),
              followers: Between(250000, 500000),
            },
          }
        } else if (followers === '500kTo750k') {
          query = {
            ...query,
            twitterStats: {
              id: Not(IsNull()),
              followers: Between(500000, 750000),
            },
          }
        } else if (followers === 'moreThan750k') {
          query = {
            ...query,
            twitterStats: {
              id: Not(IsNull()),
              followers: MoreThanOrEqual(750000),
            },
          }
        } else {
          query = {
            ...query,
            twitterStats: {
              id: Not(IsNull()),
            },
          }
        }
        relation.push('twitterStats')
      }

      let combinedQuery:
        | FindOptionsWhere<IInfluencerProfile>[]
        | FindOptionsWhere<IInfluencerProfile> = query

      if (orQuery.length > 0) {
        orQuery.map((item) => {
          return { item, ...query }
        })
        combinedQuery = orQuery
      }

      const data = await this.influencerProfileService.findAllPaginated(
        page,
        limit,
        combinedQuery,
        relation,
        order
      )

      return data
    } catch (e) {
      console.log(e)
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }

  async getAllInfluencerRequests(
    page: number,
    limit: number,
    platform: string
  ): Promise<PaginatedResponse<IInfluencerProfile>> {
    try {
      let query: FindOptionsWhere<IInfluencerProfile> = {}
      const relation: string[] = ['user']
      const order: FindOptionsOrder<IInfluencerProfile> = {
        createdAt: 'DESC',
      }

      if (platform === 'instagram') {
        query = {
          ...query,
          instagramStats: {
            id: Not(IsNull()),
          },
        }

        relation.push('instagramStats')
      }

      if (platform === 'youtube') {
        query = {
          ...query,
          youtubeStats: {
            id: Not(IsNull()),
          },
        }

        relation.push('youtubeStats')
      }

      if (platform === 'x') {
        query = {
          ...query,
          twitterStats: {
            id: Not(IsNull()),
          },
        }

        relation.push('twitterStats')
      }

      const data = await this.influencerProfileService.findAllPaginated(
        page,
        limit,
        query,
        relation,
        order
      )

      return data
    } catch (e) {
      console.log(e)
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }
}
export { InfluencerService }
