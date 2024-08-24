import { errorHandler, HttpException } from '../../utils'
import { PaginatedResponse } from '../../utils/base-service'
import { responseHandler } from '../../utils/response-handler'
import {
  IInfluencerProfile,
  IInfluencerService,
  IInfluencerStatsService,
} from '../modules/influencer/interface'
import { Request, Response } from 'express'
import millify from 'millify'
import { IUserService } from '../modules/user/interface'

class InfluencerController {
  private readonly influencerService: IInfluencerService
  private readonly influencerStatsService: IInfluencerStatsService
  private readonly userService: IUserService
  constructor(
    influencerService: IInfluencerService,
    influencerStatsService: IInfluencerStatsService,
    userService: IUserService
  ) {
    this.influencerService = influencerService
    this.influencerStatsService = influencerStatsService
    this.userService = userService
  }

  private influencerResponseDTO(
    platform: string,
    data: PaginatedResponse<IInfluencerProfile>
  ): PaginatedResponse<any> {
    let _data: any = []

    if (platform === 'youtube') {
      _data = data.data.map((item) => {
        return {
          profileId: item.id,
          name:
            item.firstName +
            ' ' +
            (item.lastName !== null ? item.lastName : ''),
          email: item.user.email,
          isPaused: item.user.isPaused,
          isVerified: item.user.isVerified,
          mobileNo: item.mobileNo,
          exclusive: item.exclusive,
          pay: item.pay,
          hideFrom: item.hideFrom,
          userId: item.user.id,
          views: millify(item?.youtubeStats?.views as number),
          subscribers: millify(item?.youtubeStats?.subscribers as number),
          videos: millify(item?.youtubeStats?.videos as number),
          profileUrl: item.youtubeURL,
          requestDate: item.createdAt,
          isApproved: item.user.isApproved,
        }
      })
    }

    if (platform === 'instagram') {
      _data = data.data.map((item) => {
        return {
          profileId: item.id,
          name:
            item.firstName +
            ' ' +
            (item.lastName !== null ? item.lastName : ''),
          email: item.user.email,
          isPaused: item.user.isPaused,
          isVerified: item.user.isVerified,
          mobileNo: item.mobileNo,
          exclusive: item.exclusive,
          pay: item.pay,
          hideFrom: item.hideFrom,
          userId: item.user.id,
          followers: millify(item?.instagramStats?.followers as number),
          likes: millify(item?.instagramStats?.likes as number),
          comments: millify(item?.instagramStats?.comments as number),
          views: millify(item?.instagramStats?.views as number),
          engagementRate: {
            value: (item?.instagramStats?.engagementRate as number) * 100,
            label: 'High',
          },
          percentageFakeFollowers:
            (item?.instagramStats?.percentageFakeFollowers as number) * 100,
          profileUrl: item.instagramURL,
          requestDate: item.createdAt,
          isApproved: item.user.isApproved,
        }
      })
    }

    if (platform === 'x') {
      _data = data.data.map((item) => {
        return {
          profileId: item.id,
          name:
            item.firstName +
            ' ' +
            (item.lastName !== null ? item.lastName : ''),
          email: item.user.email,
          isPaused: item.user.isPaused,
          isVerified: item.user.isVerified,
          mobileNo: item.mobileNo,
          exclusive: item.exclusive,
          pay: item.pay,
          hideFrom: item.hideFrom,
          userId: item.user.id,
          followers: millify(item?.twitterStats?.followers as number),
          views: millify(item?.twitterStats?.views as number),
          tweets: millify(item?.twitterStats?.tweets as number),
          replyCount: millify(item?.twitterStats?.replyCount as number),
          retweets: millify(item?.twitterStats?.retweets as number),
          profileUrl: item.twitterURL,
          requestDate: item.createdAt,
          isApproved: item.user.isApproved,
        }
      })
    }

    return {
      data: _data,
      totalPages: data.totalPages,
      totalCount: data.totalCount,
      currentPage: data.currentPage,
    }
  }

  private influencerRequestResponseDTO(
    platform: string,
    data: PaginatedResponse<IInfluencerProfile>
  ): PaginatedResponse<any> {
    let _data: any = []

    if (platform === 'youtube') {
      _data = data.data.map((item) => {
        return {
          profileId: item.id,
          name:
            item.firstName +
            ' ' +
            (item.lastName !== null ? item.lastName : ''),
          email: item.user.email,
          isApproved: item.user.isApproved,
          mobileNo: item.mobileNo,
          userId: item.user.id,
          views: millify(item?.youtubeStats?.views as number),
          subscribers: millify(item?.youtubeStats?.subscribers as number),
          videos: millify(item?.youtubeStats?.videos as number),
          profileUrl: item.youtubeURL,
          requestDate: item.createdAt,
        }
      })
    }

    if (platform === 'instagram') {
      _data = data.data.map((item) => {
        return {
          profileId: item.id,
          name:
            item.firstName +
            ' ' +
            (item.lastName !== null ? item.lastName : ''),
          email: item.user.email,
          isApproved: item.user.isApproved,
          mobileNo: item.mobileNo,
          userId: item.user.id,
          followers: millify(item?.instagramStats?.followers as number),
          likes: millify(item?.instagramStats?.likes as number),
          comments: millify(item?.instagramStats?.comments as number),
          views: millify(item?.instagramStats?.views as number),
          engagementRate: {
            value: (item?.instagramStats?.engagementRate as number) * 100,
            label: 'High',
          },
          percentageFakeFollowers:
            (item?.instagramStats?.percentageFakeFollowers as number) * 100,
          profileUrl: item.instagramURL,
          requestDate: item.createdAt,
        }
      })
    }

    if (platform === 'x') {
      _data = data.data.map((item) => {
        return {
          profileId: item.id,
          name:
            item.firstName +
            ' ' +
            (item.lastName !== null ? item.lastName : ''),
          email: item.user.email,
          isApproved: item.user.isApproved,
          mobileNo: item.mobileNo,
          userId: item.user.id,
          followers: millify(item?.twitterStats?.followers as number),
          views: millify(item?.twitterStats?.views as number),
          tweets: millify(item?.twitterStats?.tweets as number),
          replyCount: millify(item?.twitterStats?.replyCount as number),
          retweets: millify(item?.twitterStats?.retweets as number),
          profileUrl: item.twitterURL,
          requestDate: item.createdAt,
        }
      })
    }

    return {
      data: _data,
      totalPages: data.totalPages,
      totalCount: data.totalCount,
      currentPage: data.currentPage,
    }
  }

  async addInfluencerController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { email, mobileNo } = req.body

      const user = await this.userService.findUserByMobileNoAndEmail(
        mobileNo,
        email
      )

      if (user !== null)
        throw new HttpException(409, 'User already exists with same details')

      const data = await this.influencerService.addInfluencer(req.body)

      const { instagramURL, youtubeURL, linkedInURL, twitterURL } = data

      this.influencerStatsService.fetchAllStatsAndSave(
        data.id,
        instagramURL,
        youtubeURL,
        twitterURL,
        linkedInURL
      )

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

  async getAllInfluencerController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const {
        platform,
        niche,
        type,
        followers,
        page,
        limit,
        name,
        sortEr,
        refresh,
        approved,
        rejected,
      } = req.query

      if (typeof page !== 'string' || typeof limit !== 'string')
        throw new HttpException(400, 'Invalid Page Details')

      if (typeof platform !== 'string')
        throw new HttpException(400, 'Invalid Platform')

      if (refresh === 'true') {
        await this.influencerService.refreshAllInfluencer(
          parseInt(page),
          parseInt(limit),
          platform
        )
      }

      const data = await this.influencerService.getAllInfluencer(
        parseInt(page),
        parseInt(limit),
        platform,
        type as string,
        niche as string,
        followers as string,
        name as string,
        sortEr as string,
        approved as string,
        rejected as string
      )

      const _data = this.influencerResponseDTO(platform, data)

      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async getAllInfluencerRequestsController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { platform, page, limit } = req.query

      if (typeof page !== 'string' || typeof limit !== 'string')
        throw new HttpException(400, 'Invalid Page Details')

      if (typeof platform !== 'string')
        throw new HttpException(400, 'Invalid Platform')

      const data = await this.influencerService.getAllInfluencerRequests(
        parseInt(page),
        parseInt(limit),
        platform
      )

      const _data = this.influencerRequestResponseDTO(platform, data)

      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { InfluencerController }
