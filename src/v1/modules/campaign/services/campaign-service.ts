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
} from '../types'
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm'

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
    brandFilters?: BrandFilters
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
          },
        }

        if (typeof name === 'string') {
          agencyQuery = {
            ...agencyQuery,
            name: ILike(`%${name}%`),
          }
        }

        if (typeof agencyFilters?.paymentStatus === 'string')
          agencyQuery = {
            ...agencyQuery,
            paymentStatus: agencyFilters?.paymentStatus,
          }

        if (typeof agencyFilters?.platform === 'string') {
          agencyQuery = {
            ...agencyQuery,
            participants: {
              deliverables: {
                platform: agencyFilters.platform,
              },
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
        }

        if (typeof name === 'string') {
          brandQuery = {
            ...brandQuery,
            name: ILike(`%${name}%`),
          }
        }

        brandQuery = {
          ...brandQuery,
          brand: {
            id: brandFilters?.brand,
          },
        }

        if (
          brandFilters?.paymentStatus === Enum.CampaignPaymentStatus.ALL_PAID
        ) {
          brandQuery = {
            ...brandQuery,
            participants: {
              paymentStatus: Enum.CampaignPaymentStatus.ALL_PAID,
            },
          }
        } else if (
          brandFilters?.paymentStatus === Enum.CampaignPaymentStatus.PENDING
        ) {
          brandQuery = {
            ...brandQuery,
            participants: {
              paymentStatus: Enum.CampaignPaymentStatus.PENDING,
            },
          }
        }

        if (brandFilters?.platform === Enum.Platform.INSTAGRAM) {
          brandQuery = {
            ...brandQuery,
            participants: {
              deliverables: {
                platform: Enum.Platform.INSTAGRAM,
              },
            },
          }
        } else if (brandFilters?.platform === Enum.Platform.YOUTUBE) {
          brandQuery = {
            ...brandQuery,
            participants: {
              deliverables: {
                platform: Enum.Platform.YOUTUBE,
              },
            },
          }
        } else if (brandFilters?.platform === Enum.Platform.X) {
          brandQuery = {
            ...brandQuery,
            participants: {
              deliverables: {
                platform: Enum.Platform.X,
              },
            },
          }
        }

        if (
          brandFilters?.campaignStatus === Enum.CampaignDeliverableStatus.LIVE
        ) {
          brandQuery = {
            ...brandQuery,
            participants: {
              deliverables: {
                status: Enum.CampaignDeliverableStatus.LIVE,
              },
            },
          }
        } else if (
          brandFilters?.campaignStatus ===
          Enum.CampaignDeliverableStatus.NOT_LIVE
        ) {
          brandQuery = {
            ...brandQuery,
            participants: {
              deliverables: {
                status: Enum.CampaignDeliverableStatus.NOT_LIVE,
              },
            },
          }
        }

        query.push(brandQuery)
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
    agencyProfileId?: string
  ): Promise<CampaignStats> {
    try {
      return await this.crudBase.getTotalCampaignsAndRevenue(
        lowerBound,
        upperBound,
        brandProfileId,
        agencyProfileId
      )
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignService }
