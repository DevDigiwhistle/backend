import { DeepPartial } from 'typeorm'
import { Enum } from '../../constants'
import {
  ICampaign,
  ICampaignDeliverables,
  ICampaignParticipants,
} from '../modules/campaign/interface'
import { v4 as uuidv4 } from 'uuid'
import {
  CampaignStats,
  ICampaignAgencyData,
  ICampaignCardsRequest,
  ICampaignInfluencerData,
} from '../modules/campaign/types'
import millify from 'millify'
import moment from 'moment-timezone'

export class CampaignDTO {
  private static groupDeliverableByInfluencerName(
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
      let data = mp.get(deliverable.name)

      if (data === undefined) {
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
        data = [
          ...data,
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
        mp.set(deliverable.name, data)
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

    for (const [key, data] of mp) {
      influencer.push({
        name: key,
        id: uuidv4(),
        deliverables: data,
      })
    }

    return influencer
  }

  private static groupDeliverablesByInfluencers(data: ICampaignParticipants[]) {
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

  static generateInvoiceDueDate(
    paymentTerms: Enum.PaymentTerms,
    invoiceDate: Date
  ) {
    switch (paymentTerms) {
      case Enum.PaymentTerms.DAYS_0:
        return moment(invoiceDate).add(0, 'days')
      case Enum.PaymentTerms.DAYS_30:
        return moment(invoiceDate).add(30, 'days')
      case Enum.PaymentTerms.DAYS_60:
        return moment(invoiceDate).add(60, 'days')
    }
  }

  static transformationForAdminAndEmployee(data: ICampaign) {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      brandName: data.brandName,
      startDate: data.startDate,
      endDate: data.endDate,
      commercial: data.commercial,
      incentiveWinner:
        data.manager?.firstName +
        (data.manager?.lastName === null ? '' : ' ' + data.manager?.lastName) +
        ' 5% (incentive)',
      incentiveReleased: data.incentiveReleased,
      status: data.status,
      paymentStatus: data.paymentStatus,
      participants: data.participants.map((participant) => {
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
            confirmationSent: participant.confirmationSent,
            deliverables: participant.deliverables.map((deliverable) => {
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
            }),
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
            confirmationSent: participant.confirmationSent,
            paymentStatus: participant.paymentStatus,
            invoiceStatus: participant.invoiceStatus,
            influencer: influencerGroupedData,
          }
        }
      }),
    }
  }

  static transformationForInfluencer(
    data: ICampaign,
    influencerProfileId: string
  ) {
    const influencerDetails = data.participants.filter((data) => {
      return (
        data.influencerProfile !== null &&
        data.influencerProfile.id === influencerProfileId
      )
    })

    const invoice = data.purchaseInvoices?.filter((invoice) => {
      invoice.influencerProfile?.id === influencerProfileId
    })

    const invoiceDueDate =
      invoice !== undefined && invoice.length > 0
        ? this.generateInvoiceDueDate(
            invoice[0].paymentTerms,
            invoice[0].invoiceDate
          )
        : null

    return {
      campaignId: data.id,
      name: data.name,
      code: data.code,
      brandName: data.brand?.name,
      startDate: data.startDate,
      endDate: data.endDate,
      poc:
        data.manager.firstName +
        (data.manager.lastName === null ? '' : ' ' + data.manager.lastName) +
        ' DW (POC)',
      paymentStatus: influencerDetails[0].paymentStatus,
      commercial: influencerDetails[0].commercialCreator,
      toBeGiven: influencerDetails[0].toBePaid,
      invoice: influencerDetails[0].invoice,
      invoiceStatus: influencerDetails[0].invoiceStatus,
      deliverable: influencerDetails[0].deliverables,
      participantId: influencerDetails[0].id,
      invoiceDueDate: invoiceDueDate,
    }
  }

  static transformationForBrands(data: ICampaign) {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      brandName: data.brandName,
      startDate: data.startDate,
      endDate: data.endDate,
      capital: data.commercial,
      poc:
        data.manager.firstName +
        (data.manager.lastName === null ? '' : ' ' + data.manager.lastName) +
        ' DW (POC)',
      status: data.status,
      paymentStatus: data.paymentStatus,

      participants: this.groupDeliverablesByInfluencers(data.participants),
    }
  }

  static transformationForAgency(data: ICampaign, agencyProfileId: string) {
    const agencyDetails = data.participants.filter((data) => {
      return (
        data.agencyProfile !== null && data.agencyProfile.id === agencyProfileId
      )
    })
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      brandName: data.brandName,
      startDate: data.startDate,
      endDate: data.endDate,
      commercial: agencyDetails[0].toBePaid,
      poc:
        data.manager.firstName +
        (data.manager.lastName === null ? '' : ' ' + data.manager.lastName) +
        ' DW (POC)',
      status: data.status,
      paymentStatus: data.paymentStatus,
      invoiceStatus: agencyDetails[0].invoiceStatus,
      participants: this.groupDeliverableByInfluencerName(
        agencyDetails[0].deliverables
      ),
    }
  }

  static transformationForParticipantsAndDeliverablesFromCampaigns(
    data: ICampaignCardsRequest
  ) {
    const participantData: Partial<ICampaignParticipants>[] = []
    const deliverableData: DeepPartial<ICampaignDeliverables>[] = []
    const participants = data.participants
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
        const participant = value as ICampaignInfluencerData
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
        const participant = value as ICampaignAgencyData
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

    return {
      participants: participantData,
      deliverables: deliverableData,
    }
  }

  static transformationForCampaignData(data: ICampaign) {
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

    const _brand = {
      id: data.brand?.id,
      name: data.brand?.name,
    }

    const _data = {
      ...data,
      participants: _participants,
      manager: _manager,
      incentiveWinner: _incentiveWinner,
      brand: _brand,
    }

    return _data
  }

  static transformationForCampaignStats(
    data: CampaignStats,
    roleId: Enum.ROLES
  ) {
    if (roleId === Enum.ROLES.ADMIN || roleId === Enum.ROLES.EMPLOYEE) {
      return [
        {
          label: 'Total Campaigns',
          value: millify(data.totalCampaign),
          subValue: '',
          iconName: 'UsersIcon',
        },
        {
          label: 'Total Comm.Brand',
          value: millify(data.totalCommercialBrand),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
        {
          label: 'Total Comm.Creator',
          value: millify(data.totalCommercialCreator),
          subValue: '',
          icon: 'CurrencyRupeeIcon',
        },
        {
          label: 'Total To Be Paid',
          value: millify(data.totalToBeGiven),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
        {
          label: 'Total Margin',
          value: millify(data.totalMargin),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
        {
          label: 'Total Revenue',
          value: millify(data.totalRevenue),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
        {
          label: 'Pending Incentive',
          value: millify(data.pendingIncentive),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
        {
          label: 'Total Incentive',
          value: millify(data.totalIncentive),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
      ]
    } else if (roleId === Enum.ROLES.BRAND) {
      return [
        {
          label: 'Total Campaigns',
          value: millify(data.totalCampaign),
          subValue: '',
          iconName: 'UsersIcon',
        },
        {
          label: 'Total Capital',
          value: millify(data.totalRevenue === null ? 0 : data.totalRevenue),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
      ]
    } else if (
      roleId === Enum.ROLES.INFLUENCER ||
      roleId === Enum.ROLES.AGENCY
    ) {
      return [
        {
          label: 'Total Campaigns',
          value: millify(data.totalCampaign),
          subValue: '',
          iconName: 'UsersIcon',
        },
        {
          label: 'Total Revenue',
          value: millify(data.totalRevenue === null ? 0 : data.totalRevenue),
          subValue: '',
          iconName: 'CurrencyRupeeIcon',
        },
      ]
    }
  }

  static transformationForCampaignSearchByCode(data: ICampaign) {
    const { id, name, code, brand } = data

    return {
      id,
      name,
      code,
      brand: brand?.name,
    }
  }
}
