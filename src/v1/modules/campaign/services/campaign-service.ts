import { BaseService, HttpException } from '../../../../utils'
import { ICampaign, ICampaignCRUD, ICampaignService } from '../interface'
import { PaginatedResponse } from '../../../../utils/base-service'
import { FindOptionsWhere, ILike, IsNull, Not } from 'typeorm'
import { Enum } from '../../../../constants'
import {
  AdminFilters,
  AgencyFilters,
  BrandFilters,
  CampaignStats,
  InfluencerFilters,
} from '../types'
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm'
import { IPayrollService } from '../../payroll/interface'
import { AppDataSource } from '../../../../config'
import { Campaign } from '../models'
import { Payroll } from '../../payroll/models'

class CampaignService
  extends BaseService<ICampaign, ICampaignCRUD>
  implements ICampaignService
{
  private static instance: ICampaignService | null = null

  private constructor(campaignCRUD: ICampaignCRUD) {
    super(campaignCRUD)
  }

  static getInstance = (campaignCRUD: ICampaignCRUD) => {
    if (CampaignService.instance === null)
      CampaignService.instance = new CampaignService(campaignCRUD)
    return CampaignService.instance
  }

  async getAllCampaigns(
    page: number,
    limit: number,
    roleId: number,
    lowerBound: Date,
    upperBound: Date,
    name?: string,
    agencyFilters?: AgencyFilters,
    adminFilters?: AdminFilters,
    brandFilters?: BrandFilters,
    influencerFilters?: InfluencerFilters
  ): Promise<PaginatedResponse<ICampaign>> {
    try {
      let query: FindOptionsWhere<ICampaign>[] = []

      if (roleId === Enum.ROLES.AGENCY) {
        let agencyQuery: FindOptionsWhere<ICampaign> = {}

        agencyQuery = {
          startDate: MoreThanOrEqual(lowerBound),
          endDate: LessThanOrEqual(upperBound),
          participants: {
            agencyProfile: {
              id: agencyFilters?.id,
            },
            influencerProfile: {
              id: IsNull(),
            },
          },
        }

        if (typeof name === 'string') {
          agencyQuery = {
            ...agencyQuery,
            name: ILike(`%${name}%`),
          }
        }

        if (
          typeof agencyFilters?.paymentStatus === 'string' &&
          Object.values(Enum.CampaignPaymentStatus).includes(
            agencyFilters?.paymentStatus
          )
        )
          agencyQuery = {
            ...agencyQuery,
            paymentStatus: agencyFilters?.paymentStatus,
          }

        if (typeof agencyFilters?.platform === 'string') {
          if (
            typeof agencyFilters?.campaignStatus === 'string' &&
            Object.values(Enum.CampaignDeliverableStatus).includes(
              agencyFilters?.campaignStatus
            )
          ) {
            agencyQuery.participants = {
              agencyProfile: {
                id: agencyFilters?.id,
              },
              influencerProfile: {
                id: IsNull(),
              },
              id: Not(IsNull()),
              deliverables: {
                id: Not(IsNull()),
                platform: agencyFilters.platform,
                status: agencyFilters.campaignStatus,
              },
            }
          } else {
            agencyQuery.participants = {
              agencyProfile: {
                id: agencyFilters?.id,
              },
              influencerProfile: {
                id: IsNull(),
              },
              id: Not(IsNull()),
              deliverables: {
                id: Not(IsNull()),
                platform: agencyFilters.platform,
              },
            }
          }
        }

        if (
          typeof agencyFilters?.campaignStatus === 'string' &&
          Object.values(Enum.CampaignDeliverableStatus).includes(
            agencyFilters?.campaignStatus
          )
        ) {
          agencyQuery.participants = {
            agencyProfile: {
              id: agencyFilters?.id,
            },
            influencerProfile: {
              id: IsNull(),
            },
            id: Not(IsNull()),
            deliverables: {
              id: Not(IsNull()),
              status: agencyFilters.campaignStatus,
            },
          }
        }

        query.push(agencyQuery)
      }

      if (roleId === Enum.ROLES.ADMIN || roleId === Enum.ROLES.EMPLOYEE) {
        let adminQuery: FindOptionsWhere<ICampaign>[] = [
          {
            startDate: MoreThanOrEqual(lowerBound),
            endDate: LessThanOrEqual(upperBound),
          },
        ]

        if (typeof name === 'string') {
          adminQuery[0] = {
            ...adminQuery[0],
            name: ILike(`%${name}%`),
          }
        }

        if (typeof adminFilters?.paymentStatus === 'string') {
          if (
            adminFilters?.paymentStatus === Enum.CampaignPaymentStatus.ALL_PAID
          ) {
            adminQuery[0] = {
              ...adminQuery[0],
              paymentStatus: Enum.CampaignPaymentStatus.ALL_PAID,
            }
          } else if (
            adminFilters?.paymentStatus === Enum.CampaignPaymentStatus.PENDING
          ) {
            adminQuery[0] = {
              ...adminQuery[0],
              paymentStatus: Enum.CampaignPaymentStatus.PENDING,
            }
          }
        }

        if (typeof adminFilters?.influencerType === 'string') {
          if (adminFilters?.influencerType === 'exclusive') {
            adminQuery[0] = {
              ...adminQuery[0],
              participants: {
                influencerProfile: {
                  exclusive: true,
                },
              },
            }
          } else if (adminFilters?.influencerType === 'non-exclusive') {
            adminQuery[0] = {
              ...adminQuery[0],
              participants: {
                influencerProfile: {
                  exclusive: false,
                },
              },
            }

            adminQuery.push({
              ...adminQuery[0],
              participants: {
                influencerProfile: IsNull(),
              },
            })
          }
        }

        query = adminQuery
      }

      if (roleId === Enum.ROLES.BRAND) {
        let brandQuery: FindOptionsWhere<ICampaign> = {
          startDate: MoreThanOrEqual(lowerBound),
          endDate: LessThanOrEqual(upperBound),
          brand: {
            id: brandFilters?.brand,
          },
        }

        if (typeof name === 'string') {
          brandQuery = {
            ...brandQuery,
            name: ILike(`%${name}%`),
          }
        }

        if (
          typeof brandFilters?.paymentStatus === 'string' &&
          Object.values(Enum.CampaignPaymentStatus).includes(
            brandFilters?.paymentStatus
          )
        ) {
          brandQuery = {
            ...brandQuery,
            paymentStatus: brandFilters?.paymentStatus,
          }
        }

        if (typeof brandFilters?.platform === 'string') {
          if (
            typeof brandFilters?.campaignStatus === 'string' &&
            Object.values(Enum.CampaignDeliverableStatus).includes(
              brandFilters?.campaignStatus
            )
          ) {
            brandQuery = {
              ...brandQuery,
              participants: {
                id: Not(IsNull()),
                deliverables: {
                  id: Not(IsNull()),
                  platform: brandFilters?.platform,
                  status: brandFilters?.campaignStatus,
                },
              },
            }
          } else {
            brandQuery = {
              ...brandQuery,
              participants: {
                id: Not(IsNull()),
                deliverables: {
                  platform: brandFilters?.platform,
                  id: Not(IsNull()),
                },
              },
            }
          }
        }

        if (
          typeof brandFilters?.campaignStatus === 'string' &&
          Object.values(Enum.CampaignDeliverableStatus).includes(
            brandFilters?.campaignStatus
          )
        ) {
          brandQuery = {
            ...brandQuery,
            participants: {
              id: Not(IsNull()),
              deliverables: {
                status: brandFilters?.campaignStatus,
                id: Not(IsNull()),
              },
            },
          }
        }

        query.push(brandQuery)
      }

      if (roleId === Enum.ROLES.INFLUENCER) {
        let influencerQuery: FindOptionsWhere<ICampaign> = {
          startDate: MoreThanOrEqual(lowerBound),
          endDate: LessThanOrEqual(upperBound),
        }

        if (typeof name === 'string') {
          influencerQuery = {
            ...influencerQuery,
            name: ILike(`%${name}%`),
          }
        }

        influencerQuery = {
          ...influencerQuery,
          participants: {
            influencerProfile: {
              id: influencerFilters?.id,
            },
          },
        }

        if (
          influencerFilters?.paymentStatus ===
          Enum.CampaignPaymentStatus.ALL_PAID
        ) {
          influencerQuery = {
            ...influencerQuery,
            participants: {
              paymentStatus: Enum.CampaignPaymentStatus.ALL_PAID,
            },
          }
        } else if (
          influencerFilters?.paymentStatus ===
          Enum.CampaignPaymentStatus.PENDING
        ) {
          influencerQuery = {
            ...influencerQuery,
            participants: {
              paymentStatus: Enum.CampaignPaymentStatus.PENDING,
            },
          }
        }

        if (influencerFilters?.platform === Enum.Platform.INSTAGRAM) {
          influencerQuery = {
            ...influencerQuery,
            participants: {
              deliverables: {
                platform: Enum.Platform.INSTAGRAM,
              },
            },
          }
        } else if (influencerFilters?.platform === Enum.Platform.YOUTUBE) {
          influencerQuery = {
            ...influencerQuery,
            participants: {
              deliverables: {
                platform: Enum.Platform.YOUTUBE,
              },
            },
          }
        } else if (influencerFilters?.platform === Enum.Platform.X) {
          influencerQuery = {
            ...influencerQuery,
            participants: {
              deliverables: {
                platform: Enum.Platform.X,
              },
            },
          }
        }

        query.push(influencerQuery)
      }

      const data = await this.findAllPaginated(
        page,
        limit,
        query.length === 1 ? query[0] : query,
        [
          'participants',
          'participants.deliverables',
          'manager',
          'incentiveWinner',
          'participants.influencerProfile',
          'participants.agencyProfile',
          'brand',
        ],
        { createdAt: 'DESC' }
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async getTotalCampaignsAndRevenue(
    lowerBound: Date,
    upperBound: Date,
    brandProfileId?: string,
    agencyProfileId?: string,
    influencerProfileId?: string
  ): Promise<CampaignStats> {
    try {
      return await this.crudBase.getTotalCampaignsAndRevenue(
        lowerBound,
        upperBound,
        brandProfileId,
        agencyProfileId,
        influencerProfileId
      )
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async releaseIncentive(id: string): Promise<void> {
    try {
      const campaign = await this.findOne({ id: id }, ['incentiveWinner'])

      if (campaign === null) throw new HttpException(404, 'Campaign not found')

      if (campaign.incentiveReleased === true)
        throw new HttpException(400, 'Incentive already released')

      if (campaign.incentiveWinner === null)
        throw new HttpException(400, 'Incentive Winner not found')

      await AppDataSource.manager.transaction(async (manager) => {
        await manager.update(
          Campaign,
          { id: campaign.id },
          { incentiveReleased: true }
        )

        await manager.increment(
          Payroll,
          {
            employeeProfile: {
              id: campaign.incentiveWinner?.id,
            },
          },
          'incentive',
          0.05 * campaign.commercial
        )
      })
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignService }
