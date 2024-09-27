import { Request, Response } from 'express'
import { BaseController, errorHandler, HttpException } from '../../utils'
import {
  ICampaign,
  ICampaignCRUD,
  ICampaignDeliverables,
  ICampaignDeliverablesService,
  ICampaignParticipants,
  ICampaignParticipantsService,
  ICampaignService,
} from '../modules/campaign/interface'
import { responseHandler } from '../../utils/response-handler'
import { IUserService } from '../modules/user/interface'
import { v4 as uuidv4 } from 'uuid'
import { DeepPartial } from 'typeorm'
import { IExtendedRequest } from '../interface'
import { Enum } from '../../constants'
import {
  IAgencyDTO,
  ICampaignDTO,
  IInfluencerDTO,
} from '../modules/campaign/types'

class CampaignController extends BaseController<
  ICampaign,
  ICampaignCRUD,
  ICampaignService
> {
  private readonly campaignParticipantsService: ICampaignParticipantsService
  private readonly campaignDeliverableService: ICampaignDeliverablesService
  private readonly userService: IUserService

  constructor(
    campaignService: ICampaignService,
    campaignParticipantsService: ICampaignParticipantsService,
    campaignDeliverableService: ICampaignDeliverablesService,
    userService: IUserService
  ) {
    super(campaignService)
    this.campaignParticipantsService = campaignParticipantsService
    this.campaignDeliverableService = campaignDeliverableService
    this.userService = userService
  }

  private groupDeliverableByInfluencerName(
    deliverables: ICampaignDeliverables[]
  ) {
    const mp: Map<
      string,
      Array<{
        id: string
        title: string
        platform: Enum.Platform
        status: Enum.CampaignDeliverableStatus
        deliverableLink: string | null
        er: number | null
        cpv: number | null
        desc: string | null
      }>
    > = new Map()

    deliverables.map((deliverable: ICampaignDeliverables) => {
      let value = mp.get(deliverable.name)

      if (value === undefined) {
        mp.set(deliverable.name, [
          {
            id: deliverable.id,
            title: deliverable.title,
            platform: deliverable.platform,
            status: deliverable.status,
            deliverableLink: deliverable.link,
            er: deliverable.engagementRate,
            cpv: deliverable.cpv,
            desc: deliverable.desc,
          },
        ])
      } else {
        value = [
          ...value,
          {
            id: deliverable.id,
            title: deliverable.title,
            platform: deliverable.platform,
            status: deliverable.status,
            deliverableLink: deliverable.link,
            er: deliverable.engagementRate,
            cpv: deliverable.cpv,
            desc: deliverable.desc,
          },
        ]
        mp.set(deliverable.name, value)
      }
    })

    const influencer: Array<{
      id: string
      name: string
      deliverables: Array<{
        id: string
        title: string
        platform: Enum.Platform
        status: Enum.CampaignDeliverableStatus
        deliverableLink: string | null
        er: number | null
        cpv: number | null
      }>
    }> = []

    for (const [key, value] of mp) {
      influencer.push({
        name: key,
        id: uuidv4(),
        deliverables: value,
      })
    }

    return influencer
  }

  private campaignsAdminAndEmployeeDTO(data: ICampaign[]) {
    const _data = data.map((value) => {
      return {
        id: value.id,
        name: value.name,
        code: value.code,
        brandName: value.brandName,
        startDate: value.startDate,
        endDate: value.endDate,
        commercial: value.commercial,
        incentiveWinner:
          value.manager?.firstName +
          (value.manager?.lastName === null
            ? ''
            : ' ' + value.manager?.lastName) +
          ' 5% (incentive)',
        status: value.status,
        paymentStatus: value.paymentStatus,
        participants: value.participants.map((participant) => {
          if (participant.influencerProfile !== null) {
            return {
              type: 'influencer',
              id: participant.id,
              name:
                participant.influencerProfile.firstName +
                (participant.influencerProfile.lastName === null
                  ? ''
                  : ' ' + participant.influencerProfile.lastName),
              exclusive: participant.influencerProfile.exclusive,
              invoice: participant.invoice,
              commercialBrand: participant.commercialBrand,
              commercialCreator: participant.commercialCreator,
              toBeGiven: participant.toBePaid,
              margin: participant.margin,
              paymentStatus: participant.paymentStatus,
              invoiceStatus: participant.invoiceStatus,
              deliverables:
                participant.deliverables.length > 0
                  ? participant.deliverables.map((deliverable) => {
                      return {
                        id: deliverable.id,
                        title: deliverable.title,
                        platform: deliverable.platform,
                        status: deliverable.status,
                        deliverableLink: deliverable.link,
                        er: deliverable.engagementRate,
                        cpv: deliverable.cpv,
                        desc: deliverable.desc,
                      }
                    })
                  : [
                      {
                        id: null,
                        title: null,
                        platform: Enum.Platform.INSTAGRAM,
                        status: Enum.CampaignDeliverableStatus.NOT_LIVE,
                        deliverableLink: null,
                        er: null,
                        cpv: null,
                      },
                    ],
            }
          } else {
            const influencerGroupedData = this.groupDeliverableByInfluencerName(
              participant.deliverables
            )
            return {
              type: 'agency',
              id: participant.id,
              name: participant?.agencyProfile?.name,
              invoice: participant.invoice,
              commercialBrand: participant.commercialBrand,
              commercialCreator: participant.commercialCreator,
              toBeGiven: participant.toBePaid,
              margin: participant.margin,
              paymentStatus: participant.paymentStatus,
              invoiceStatus: participant.invoiceStatus,
              influencer:
                influencerGroupedData.length > 0
                  ? influencerGroupedData
                  : [
                      {
                        id: null,
                        name: null,
                        deliverables: [
                          {
                            id: null,
                            title: null,
                            platform: Enum.Platform.INSTAGRAM,
                            status: Enum.CampaignDeliverableStatus.NOT_LIVE,
                            deliverableLink: null,
                            er: null,
                            cpv: null,
                          },
                        ],
                      },
                    ],
            }
          }
        }),
      }
    })

    return _data
  }

  private getAllDeliverablesForParticipants(
    participants: ICampaignParticipants[],
    agencyProfileId: string
  ) {
    let _data: Array<{
      id: string
      name: string
      deliverables: Array<{
        id: string
        title: string
        platform: Enum.Platform
        status: Enum.CampaignDeliverableStatus
        deliverableLink: string | null
        er: number | null
        cpv: number | null
      }>
    }> = []

    participants.forEach((value) => {
      if (value.agencyProfile?.id === agencyProfileId) {
        _data = this.groupDeliverableByInfluencerName(value.deliverables)
      }
    })

    return _data
  }

  private campaignsAgencyDTO(data: ICampaign[], agencyProfileId: string) {
    const _data = data.map((value) => {
      return {
        id: value.id,
        name: value.name,
        code: value.code,
        brandName: value.brandName,
        startDate: value.startDate,
        endDate: value.endDate,
        commercial: value.commercial,
        poc:
          value.manager.firstName +
          (value.manager.lastName === null
            ? ''
            : ' ' + value.manager.lastName) +
          ' DW (POC)',
        status: value.status,
        paymentStatus: value.paymentStatus,
        participants: this.getAllDeliverablesForParticipants(
          value.participants,
          agencyProfileId
        ),
      }
    })

    return _data
  }

  private groupDeliverablesByInfluencers(data: ICampaignParticipants[]) {
    const mp: Map<
      string,
      Array<{
        id: string
        title: string
        platform: Enum.Platform
        status: Enum.CampaignDeliverableStatus
        deliverableLink: string | null
        er: number | null
        cpv: number | null
      }>
    > = new Map()

    const influencer: Array<{
      name: string
      deliverables: Array<{
        id: string
        title: string
        platform: Enum.Platform
        status: Enum.CampaignDeliverableStatus
        deliverableLink: string | null
        er: number | null
        cpv: number | null
      }>
    }> = []

    data.forEach((value: ICampaignParticipants) => {
      value.deliverables.forEach((deliverable: ICampaignDeliverables) => {
        let value = mp.get(deliverable.name)

        if (value === undefined) {
          mp.set(deliverable.name, [
            {
              id: deliverable.id,
              title: deliverable.title,
              platform: deliverable.platform,
              status: deliverable.status,
              deliverableLink: deliverable.link,
              er: deliverable.engagementRate,
              cpv: deliverable.cpv,
            },
          ])
        } else {
          value = [
            ...value,
            {
              id: deliverable.id,
              title: deliverable.title,
              platform: deliverable.platform,
              status: deliverable.status,
              deliverableLink: deliverable.link,
              er: deliverable.engagementRate,
              cpv: deliverable.cpv,
            },
          ]
          mp.set(deliverable.name, value)
        }
      })
    })

    for (const [key, value] of mp) {
      influencer.push({
        name: key,
        deliverables: value,
      })
    }

    return influencer
  }

  private campaignsBrandDTO(data: ICampaign[]) {
    const _data = data.map((value) => {
      return {
        id: value.id,
        name: value.name,
        code: value.code,
        brandName: value.brandName,
        startDate: value.startDate,
        endDate: value.endDate,
        capital: value.commercial,
        poc:
          value.manager.firstName +
          (value.manager.lastName === null
            ? ''
            : ' ' + value.manager.lastName) +
          ' DW (POC)',
        status: value.status,
        paymentStatus: value.paymentStatus,
        participants: this.groupDeliverablesByInfluencers(value.participants),
      }
    })

    return _data
  }

  async addController(req: Request, res: Response): Promise<Response> {
    try {
      const { participants, ...data } = req.body

      const campaign = await this.service.add(data)

      const campaignParticipants: DeepPartial<ICampaignParticipants>[] = []

      participants.forEach(
        (participant: {
          profileId: string
          email: string
          roleId: number
          id: string
        }) => {
          if (participant.roleId === 4) {
            campaignParticipants.push({
              id: participant.id,
              email: participant.email,
              influencerProfile: {
                id: participant.profileId,
              },
              commercialBrand: campaign.commercial,
              campaign: {
                id: campaign.id,
              },
            })
          } else if (participant.roleId === 5) {
            campaignParticipants.push({
              id: participant.id,
              email: participant.email,
              agencyProfile: {
                id: participant.profileId,
              },
              commercialBrand: campaign.commercial,
              campaign: {
                id: campaign.id,
              },
            })
          }
        }
      )

      await this.campaignParticipantsService
        .insertMany(campaignParticipants)
        .catch(async (err) => {
          await this.service.delete({ id: campaign.id })
          throw new HttpException(500, err.message)
        })

      return responseHandler(
        201,
        res,
        'Campaign created successfully',
        campaign
      )
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async findInfluencerAndAgencyController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      if (!req.query?.email) {
        throw new HttpException(400, 'Email is required')
      }

      const data = await this.userService.findInfluencerAndAgencyByEmail(
        req.query.email as string
      )

      const _data: any[] = []

      data.forEach((value) => {
        const profile =
          value.agencyProfile === null
            ? value.influencerProfile
            : value.agencyProfile

        const roleId = value.agencyProfile === null ? 4 : 5

        if (profile !== null && profile !== undefined) {
          _data.push({
            profileId: profile.id,
            email: value.email,
            profilePic: profile.profilePic,
            roleId: roleId,
            id: uuidv4(),
          })
        }
      })

      return responseHandler(200, res, 'Campaigns fetched successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async findEmployeesController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { name } = req.query

      if (typeof name !== 'string')
        throw new HttpException(400, 'Invalid Email')

      const data = await this.userService.findEmployeeByName(name)

      const _data = data.map((value) => {
        return {
          name:
            value?.employeeProfile?.firstName +
            (value?.employeeProfile?.lastName === null
              ? ''
              : ' ' + value?.employeeProfile?.lastName),
          id: value.employeeProfile?.id,
        }
      })

      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async findBrandsController(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.query

      if (typeof name !== 'string')
        throw new HttpException(400, 'Invalid Email')

      const data = await this.userService.findBrandsByName(name)

      const _data = data.map((value) => {
        return {
          id: value?.brandProfile?.id,
          name: value?.brandProfile?.name,
        }
      })

      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async updateController(req: Request, res: Response): Promise<Response> {
    try {
      const { participants, ...data } = req.body
      const campaignId = req.params?.id

      if (typeof campaignId !== 'string') {
        throw new HttpException(400, 'Invalid campaign id')
      }

      const campaign = await this.service.update({ id: campaignId }, data)

      const campaignParticipants: DeepPartial<ICampaignParticipants>[] = []

      participants.forEach(
        (participant: {
          profileId: string
          email: string
          roleId: number
          id: string
        }) => {
          if (participant.roleId === 4) {
            campaignParticipants.push({
              id: participant.id,
              email: participant.email,
              influencerProfile: {
                id: participant.profileId,
              },
              commercialBrand: campaign.commercial,
              campaign: {
                id: campaignId,
              },
            })
          } else if (participant.roleId === 5) {
            campaignParticipants.push({
              id: participant.id,
              email: participant.email,
              agencyProfile: {
                id: participant.profileId,
              },
              commercialBrand: campaign.commercial,
              campaign: {
                id: campaignId,
              },
            })
          }
        }
      )

      await this.campaignParticipantsService.insertMany(campaignParticipants)

      return responseHandler(200, res, 'Updated Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async getAllController(
    req: IExtendedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const { page, limit } = req.query

      if (typeof page !== 'string' || typeof limit !== 'string')
        throw new HttpException(400, 'Invalid Page Details')

      const roleId = req.user.role.id

      const { startTime, endTime } = req.query

      if (typeof startTime !== 'string' || typeof endTime !== 'string') {
        throw new HttpException(400, 'Invalid Date format')
      }

      const lowerBound = new Date(startTime)
      const upperBound = new Date(endTime)

      if (
        !(
          lowerBound instanceof Date && lowerBound.toISOString() === startTime
        ) ||
        !(upperBound instanceof Date && upperBound.toISOString() === endTime)
      ) {
        throw new HttpException(400, 'Invalid Date')
      }

      const { name } = req.query

      if (roleId === Enum.ROLES.ADMIN || roleId === Enum.ROLES.EMPLOYEE) {
        const { payment, type } = req.query

        const data = await this.service.getAllCampaigns(
          parseInt(page),
          parseInt(limit),
          roleId,
          lowerBound,
          upperBound,
          name as string,
          undefined,
          {
            influencerType: type as string,
            paymentStatus: payment as Enum.CampaignPaymentStatus,
          }
        )

        const _data = this.campaignsAdminAndEmployeeDTO(data.data)

        return responseHandler(200, res, 'Fetched Successfully', {
          data: _data,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
        })
      } else if (roleId === Enum.ROLES.AGENCY) {
        const user = await this.userService.findOne({ id: req.user.id }, [
          'agencyProfile',
        ])
        const agencyProfileId = user?.agencyProfile?.id
        if (agencyProfileId === undefined)
          throw new HttpException(404, 'Agency Not Found')

        const { name, payment, platform } = req.query

        const data = await this.service.getAllCampaigns(
          parseInt(page),
          parseInt(limit),
          roleId,
          lowerBound,
          upperBound,
          name as string,
          {
            id: agencyProfileId,
            paymentStatus: payment as Enum.CampaignPaymentStatus,
            platform: platform as Enum.Platform,
          }
        )

        const _data = this.campaignsAgencyDTO(data.data, agencyProfileId)
        return responseHandler(200, res, 'Fetched Successfully', {
          data: _data,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
        })
      } else if (roleId === Enum.ROLES.BRAND) {
        const { paymentStatus, campaignStatus, platform } = req.query

        const user = await this.userService.findOne({ id: req.user.id }, [
          'brandProfile',
        ])
        const brandProfileId = user?.brandProfile?.id

        if (brandProfileId === undefined)
          throw new HttpException(404, 'Brand Not Found')

        const data = await this.service.getAllCampaigns(
          parseInt(page),
          parseInt(limit),
          roleId,
          lowerBound,
          upperBound,
          name as string,
          undefined,
          undefined,
          {
            paymentStatus: paymentStatus as Enum.CampaignPaymentStatus,
            campaignStatus: campaignStatus as Enum.CampaignDeliverableStatus,
            platform: platform as Enum.Platform,
            brand: brandProfileId,
          }
        )

        const _data = this.campaignsBrandDTO(data.data)

        return responseHandler(200, res, 'Fetched Successfully', {
          data: _data,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
        })
      }

      return responseHandler(200, res, 'Fetched Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async getAllStatsController(
    req: IExtendedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const roleId = req.user.role.id
      const { startTime, endTime } = req.query

      if (typeof startTime !== 'string' || typeof endTime !== 'string') {
        throw new HttpException(400, 'Invalid Date format')
      }

      const lowerBound = new Date(startTime)
      const upperBound = new Date(endTime)

      if (
        !(
          lowerBound instanceof Date && lowerBound.toISOString() === startTime
        ) ||
        !(upperBound instanceof Date && upperBound.toISOString() === endTime)
      ) {
        throw new HttpException(400, 'Invalid Date')
      }

      if (roleId === Enum.ROLES.ADMIN || roleId === Enum.ROLES.EMPLOYEE) {
        const data = await this.service.getTotalCampaignsAndRevenue(
          lowerBound,
          upperBound
        )
        const _data = [
          {
            label: 'Total Campaigns',
            value: parseInt(data.totalCampaign),
            subValue: '',
            iconName: 'UsersIcon',
          },
          {
            label: 'Total Comm.Brand',
            value: data.totalRevenue === null ? 0 : data.totalRevenue,
            subValue: '',
            iconName: 'CurrencyRupeeIcon',
          },
        ]

        return responseHandler(200, res, 'Fetched Successfully', _data)
      } else if (roleId === Enum.ROLES.BRAND) {
        const user = await this.userService.findOne({ id: req.user.id }, [
          'brandProfile',
        ])
        const brandProfileId = user?.brandProfile?.id

        const data = await this.service.getTotalCampaignsAndRevenue(
          lowerBound,
          upperBound,
          brandProfileId
        )
        const _data = [
          {
            label: 'Total Campaigns',
            value: parseInt(data.totalCampaign),
            subValue: '',
            iconName: 'UsersIcon',
          },
          {
            label: 'Total Capital',
            value: data.totalRevenue === null ? 0 : data.totalRevenue,
            subValue: '',
            iconName: 'CurrencyRupeeIcon',
          },
        ]
        return responseHandler(200, res, 'Fetched Successfully', _data)
      } else if (roleId === Enum.ROLES.AGENCY) {
        const user = await this.userService.findOne({ id: req.user.id }, [
          'agencyProfile',
        ])
        const agencyProfileId = user?.agencyProfile?.id

        const data = await this.service.getTotalCampaignsAndRevenue(
          lowerBound,
          upperBound,
          undefined,
          agencyProfileId
        )

        const _data = [
          {
            label: 'Total Campaigns',
            value: parseInt(data.totalCampaign),
            subValue: '',
            iconName: 'UsersIcon',
          },
          {
            label: 'Total Capital',
            value: data.totalRevenue === null ? 0 : data.totalRevenue,
            subValue: '',
            iconName: 'CurrencyRupeeIcon',
          },
        ]
        return responseHandler(200, res, 'Fetched Successfully', _data)
      }
      return responseHandler(200, res, 'Fetched Successfully', {})
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async updateCardsController(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body as ICampaignDTO
      const participants = data.participants
      const participantData: Partial<ICampaignParticipants>[] = []
      const deliverableData: DeepPartial<ICampaignDeliverables>[] = []

      participants.map((value) => {
        participantData.push({
          id: value.id,
          commercialBrand: value.commercialBrand,
          commercialCreator: value.commercialCreator,
          paymentStatus: value.paymentStatus,
          invoiceStatus: value.invoiceStatus,
          toBePaid: value.toBeGiven,
          margin: value.margin,
          invoice: value.invoice,
        })

        if (value.type === 'influencer') {
          const participant = value as IInfluencerDTO
          participant.deliverables.map((deliverable) => {
            deliverableData.push({
              id: deliverable.id,
              cpv: deliverable.cpv,
              engagementRate: deliverable.er,
              platform: deliverable.platform,
              status: deliverable.campaignStatus,
              link: deliverable.deliverableLink,
              title: deliverable.title,
              name: value.name,
              desc: deliverable.desc,
              campaignParticipant: {
                id: value.id,
              },
            })
          })
        } else if (value.type === 'agency') {
          const participant = value as IAgencyDTO
          participant.influencer.map((influencer) => {
            influencer.deliverables.map((deliverable) => {
              deliverableData.push({
                id: deliverable.id,
                cpv: deliverable.cpv,
                engagementRate: deliverable.er,
                platform: deliverable.platform,
                status: deliverable.campaignStatus,
                link: deliverable.deliverableLink,
                title: deliverable.title,
                name: value.name,
                desc: deliverable.desc,
                campaignParticipant: {
                  id: value.id,
                },
              })
            })
          })
        }
      })

      await Promise.all([
        this.campaignParticipantsService.updateMany(participantData),
        this.campaignDeliverableService.insertMany(deliverableData),
      ])

      return responseHandler(200, res, 'Updated Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async getByIdController(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if (typeof id !== 'string') throw new HttpException(400, 'Invalid Id')

      const data = await this.service.findOne({ id: id }, [
        'participants',
        'participants.influencerProfile',
        'participants.agencyProfile',
        'manager',
        'incentiveWinner',
      ])

      if (data === null) throw new HttpException(404, 'Campaign Not Found')

      const _participants = data.participants.map((value) => {
        if (value.influencerProfile !== null) {
          return {
            profileId: value.influencerProfile?.id,
            email: value.email,
            id: value.id,
            roleId: Enum.ROLES.INFLUENCER,
            profilePic: value.influencerProfile?.profilePic,
          }
        } else {
          return {
            profileId: value.agencyProfile?.id,
            email: value.email,
            id: value.id,
            roleId: Enum.ROLES.AGENCY,
            profilePic: null,
          }
        }
      })

      const _manager = {
        id: data.manager?.id,
        name:
          data.manager?.firstName +
          (data.manager?.lastName === null ? '' : ' ' + data.manager?.lastName),
      }

      const _incentiveWinner = {
        id: data.incentiveWinner?.id,
        name:
          data.incentiveWinner?.firstName +
          (data.incentiveWinner?.lastName === null
            ? ''
            : ' ' + data.incentiveWinner?.lastName),
      }

      const _data = {
        ...data,
        participants: _participants,
        manager: _manager,
        incentiveWinner: _incentiveWinner,
      }

      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { CampaignController }
