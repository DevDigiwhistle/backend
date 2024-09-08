import { Request, Response } from 'express'
import { BaseController, errorHandler, HttpException } from '../../utils'
import {
  ICampaign,
  ICampaignCRUD,
  ICampaignDeliverables,
  ICampaignParticipants,
  ICampaignParticipantsService,
  ICampaignService,
} from '../modules/campaign/interface'
import { responseHandler } from '../../utils/response-handler'
import { IUserService } from '../modules/user/interface'
import { v4 as uuidv4 } from 'uuid'
import { DeepPartial } from 'typeorm'
import { IExtendedRequest } from '../interface'
import { IEmployeeProfileService } from '../modules/admin/interface'
import { Enum } from '../../constants'

class CampaignController extends BaseController<
  ICampaign,
  ICampaignCRUD,
  ICampaignService
> {
  private readonly campaignParticipantsService: ICampaignParticipantsService
  private readonly userService: IUserService
  private readonly employeeProfileService: IEmployeeProfileService

  constructor(
    campaignService: ICampaignService,
    campaignParticipantsService: ICampaignParticipantsService,
    userService: IUserService,
    employeeProfileService: IEmployeeProfileService
  ) {
    super(campaignService)
    this.campaignParticipantsService = campaignParticipantsService
    this.userService = userService
    this.employeeProfileService = employeeProfileService
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

    const influencer: Array<{
      id: string
      name: string
      deliverable: Array<{
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
        deliverable: value,
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
              deliverables: participant.deliverables.map((deliverable) => {
                return {
                  id: deliverable.id,
                  title: deliverable.title,
                  platform: deliverable.platform,
                  status: deliverable.status,
                  deliverableLink: deliverable.link,
                  er: deliverable.engagementRate,
                  cpv: deliverable.cpv,
                }
              }),
            }
          } else {
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
              influencer: this.groupDeliverableByInfluencerName(
                participant.deliverables
              ),
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
      deliverable: Array<{
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
        participants: this.getAllDeliverablesForParticipants(
          value.participants,
          agencyProfileId
        ),
      }
    })
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

  async findAllEmployeesController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = await this.employeeProfileService.findAll({})
      const _data = data.map((value) => {
        return {
          name:
            value.firstName +
            (value.lastName === null ? '' : ' ' + value.lastName),
          id: value.id,
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

      if (roleId === Enum.ROLES.ADMIN || roleId === Enum.ROLES.EMPLOYEE) {
        const data = await this.service.getAllCampaigns(
          parseInt(page),
          parseInt(limit),
          roleId,
          undefined
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

        const { name, paymentStatus, platform } = req.query

        const data = await this.service.getAllCampaigns(
          parseInt(page),
          parseInt(limit),
          roleId,
          {
            id: agencyProfileId,
            name: name as string,
            paymentStatus: paymentStatus as Enum.CampaignPaymentStatus,
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
      }

      return responseHandler(200, res, 'Fetched Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { CampaignController }
