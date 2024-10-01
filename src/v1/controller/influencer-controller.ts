import { errorHandler, HttpException } from '../../utils'
import { PaginatedResponse } from '../../utils/base-service'
import { responseHandler } from '../../utils/response-handler'
import {
  IInfluencerProfile,
  IInfluencerService,
  IInfluencerStatsService,
  IInstagramService,
  ITwitterService,
  IYoutubeService,
} from '../modules/influencer/interface'
import { Request, Response } from 'express'
import millify from 'millify'
import { IUserService } from '../modules/user/interface'

class InfluencerController {
  private readonly influencerService: IInfluencerService
  private readonly influencerStatsService: IInfluencerStatsService
  private readonly userService: IUserService
  private readonly instagramService: IInstagramService
  private readonly youtubeService: IYoutubeService
  private readonly twitterService: ITwitterService

  constructor(
    influencerService: IInfluencerService,
    influencerStatsService: IInfluencerStatsService,
    userService: IUserService,
    instagramService: IInstagramService,
    youtubeService: IYoutubeService,
    twitterService: ITwitterService
  ) {
    this.influencerService = influencerService
    this.influencerStatsService = influencerStatsService
    this.userService = userService
    this.instagramService = instagramService
    this.youtubeService = youtubeService
    this.twitterService = twitterService
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

      return responseHandler(200, res, 'Added Successfully', {}, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async inviteInfluencerController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      await this.influencerService.inviteInfluencer(req.body)
      return responseHandler(200, res, 'Invited Successfully', {}, req)
    } catch (e) {
      return errorHandler(e, res, req)
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

      return responseHandler(200, res, 'Fetched Successfully', _data, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async getInfluencerStatsController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.influencerService.getInfluencerStats()
      const _data = [
        {
          label: 'Total Influencers',
          value: parseInt(data.exclusive) + parseInt(data.nonexclusive),
          subValue: '',
          iconName: 'UsersIcon',
        },
        {
          label: 'Exclusive Influencers',
          value: parseInt(data.exclusive),
          subValue: '',
          iconName: 'StarIcon',
        },
      ]
      return responseHandler(200, res, 'Fetched Successfully', _data, req)
    } catch (e) {
      return errorHandler(e, res, req)
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

      return responseHandler(200, res, 'Fetched Successfully', _data, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async exploreInfluencerController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { url } = req.query

      if (typeof url !== 'string') throw new HttpException(400, 'Invalid URL')

      if (url.includes('instagram')) {
        const data = await this.instagramService.getInstagramProfileStats(url)
        const _data = {
          cards: [
            {
              label: 'Followers Count',
              value: data.followers,
              subValue: '',
              iconName: 'UsersIcon',
            },
            {
              label: 'Average ER',
              value: Math.round(data.engagementRate * 100),
              subValue: '',
              iconName: 'ChartPieIcon',
            },
            {
              label: 'Average Views',
              value: data.views,
              subValue: '',
              iconName: 'ChartBarIcon',
            },
            {
              label: 'Average Likes',
              value: data.likes,
              subValue: '',
              iconName: 'EyeIcon',
            },
          ],
          name: data.name,
          profilePic: data.image,
          desc: data.description,
          metric: {
            key: 'Fake Followers',
            value: Math.round(data.percentageFakeFollowers * 100),
          },
          profileUrl: url,
        }
        return responseHandler(200, res, 'Fetched Successfully', _data, req)
      } else if (url.includes('x.com')) {
        const data = await this.twitterService.getTwitterProfileStats(url)
        const _data = {
          cards: [
            {
              label: 'Followers Count',
              value: data.followers,
              subValue: '',
              iconName: 'UsersIcon',
            },
            {
              label: 'Reply Count',
              value: data.replyCount,
              subValue: '',
              iconName: 'InboxArrowDownIcon',
            },
            {
              label: 'Tweets',
              value: data.tweets,
              subValue: '',
              iconName: 'ChatBubbleBottomCenterTextIcon',
            },
            {
              label: 'Average Views',
              value: data.views,
              subValue: '',
              iconName: 'EyeIcon',
            },
          ],
          name: data.name,
          profilePic: data.image,
          desc: data.description,
          metric: {
            key: 'Retweets',
            value: data.retweets,
          },
          profileUrl: url,
        }

        return responseHandler(200, res, 'Fetched Successfully', _data, req)
      } else if (url.includes('youtube')) {
        const data = await this.youtubeService.getYoutubeProfileStats(url)
        const _data = {
          cards: [
            {
              label: 'Subscribers',
              value: data.subscribers,
              subValue: '',
              iconName: 'UsersIcon',
            },
            {
              label: 'Average Views',
              value: data.views,
              subValue: '',
              iconName: 'EyeIcon',
            },
            {
              label: 'Videos',
              value: data.videos,
              subValue: '',
              iconName: 'VideoCameraIcon',
            },
          ],
          name: data.title,
          profilePic: data.image,
          desc: data.description,
          profileUrl: url,
        }
        return responseHandler(200, res, 'Fetched Successfully', _data, req)
      } else throw new HttpException(400, 'Invalid Url')
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }
}

export { InfluencerController }
