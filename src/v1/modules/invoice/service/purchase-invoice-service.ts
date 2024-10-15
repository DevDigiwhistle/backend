import { Between, DeepPartial, FindOptionsWhere, ILike } from 'typeorm'
import {
  AppLogger,
  BaseService,
  HttpException,
  uploadFileToFirebase,
} from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import {
  IPurchaseInvoice,
  IPurchaseInvoiceCRUD,
  IPurchaseInvoiceService,
} from '../interface'
import { ShareInvoiceRequest } from '../types'
import { IMailerService } from '../../../utils'
import { generateCSV } from '../utils'
import fs from 'fs'
import {
  ICampaignParticipants,
  ICampaignParticipantsService,
} from '../../campaign/interface'
import { Enum } from '../../../../constants'
import { Attachment } from 'nodemailer/lib/mailer'

export class PurchaseInvoiceService
  extends BaseService<IPurchaseInvoice, IPurchaseInvoiceCRUD>
  implements IPurchaseInvoiceService
{
  private static instance: IPurchaseInvoiceService | null = null
  private readonly mailerService: IMailerService
  private readonly campaignParticipantService: ICampaignParticipantsService

  static getInstance = (
    purchaseInvoiceCRUD: IPurchaseInvoiceCRUD,
    mailerService: IMailerService,
    campaignParticipantService: ICampaignParticipantsService
  ) => {
    if (PurchaseInvoiceService.instance === null) {
      PurchaseInvoiceService.instance = new PurchaseInvoiceService(
        purchaseInvoiceCRUD,
        mailerService,
        campaignParticipantService
      )
    }
    return PurchaseInvoiceService.instance
  }

  private constructor(
    purchaseInvoiceCRUD: IPurchaseInvoiceCRUD,
    mailerService: IMailerService,
    campaignParticipantService: ICampaignParticipantsService
  ) {
    super(purchaseInvoiceCRUD)
    this.mailerService = mailerService
    this.campaignParticipantService = campaignParticipantService
  }

  async add(data: DeepPartial<IPurchaseInvoice>): Promise<IPurchaseInvoice> {
    try {
      let Query: FindOptionsWhere<IPurchaseInvoice> = {
        campaign: {
          id: data.campaign as unknown as string,
        },
      }

      if (data.influencerProfile !== null) {
        Query = {
          ...Query,
          influencerProfile: {
            id: data.influencerProfile as unknown as string,
          },
        }
      } else if (data.agencyProfile !== null) {
        Query = {
          ...Query,
          agencyProfile: {
            id: data.agencyProfile as unknown as string,
          },
        }
      }

      const exitingInvoice = await this.crudBase.findOne(Query)

      if (exitingInvoice !== null)
        throw new HttpException(400, 'Invoice Already Exists')

      let query: FindOptionsWhere<ICampaignParticipants> = {
        campaign: {
          id: data.campaign as unknown as string,
        },
      }

      if (data.influencerProfile !== null) {
        query = {
          ...query,
          influencerProfile: {
            id: data.influencerProfile as unknown as string,
          },
        }
      } else if (data.agencyProfile !== null) {
        query = {
          ...query,
          agencyProfile: {
            id: data.agencyProfile as unknown as string,
          },
        }
      }

      const participant = await this.campaignParticipantService.findOne(query, [
        'deliverables',
      ])

      if (participant === null)
        throw new HttpException(
          400,
          'Not Part of this campaign, cannot process the invoice'
        )

      participant.deliverables.map((deliverable) => {
        if (deliverable.status === Enum.CampaignDeliverableStatus.NOT_LIVE) {
          throw new HttpException(
            400,
            'All Deliverables are not live so cannot process invoice request'
          )
        }
      })

      const resp = await this.crudBase.add(data)

      await this.campaignParticipantService
        .update(
          { id: participant.id },
          {
            invoice: resp.invoiceNo,
            invoiceStatus: Enum.CampaignInvoiceStatus.GENERATED,
          }
        )
        .catch(async (e) => {
          await this.crudBase.delete({ id: resp.id }).catch((e) => {
            AppLogger.getInstance().error(e)
          })
          throw new HttpException(e?.errorCode, e?.message)
        })

      return resp
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async getAllPurchaseInvoices(
    page: number,
    limit: number,
    startDate: Date,
    endDate: Date,
    invoiceNo: string,
    influencerProfileId?: string,
    agencyProfileId?: string
  ): Promise<PaginatedResponse<IPurchaseInvoice>> {
    try {
      let query: FindOptionsWhere<IPurchaseInvoice> = {
        invoiceDate: Between(startDate, endDate),
      }

      if (typeof invoiceNo === 'string' && invoiceNo !== '') {
        query = { ...query, invoiceNo: ILike(`%${invoiceNo}%`) }
      }

      if (typeof influencerProfileId === 'string') {
        query = {
          ...query,
          influencerProfile: {
            id: influencerProfileId,
          },
        }
      }

      if (typeof agencyProfileId === 'string') {
        query = {
          ...query,
          agencyProfile: {
            id: agencyProfileId,
          },
        }
      }

      const data = await this.crudBase.findAllPaginated(
        page,
        limit,
        query,
        ['campaign', 'campaign.brand', 'influencerProfile', 'agencyProfile'],
        {
          invoiceDate: 'DESC',
        }
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async sharePurchaseInvoice(data: ShareInvoiceRequest): Promise<void> {
    try {
      const { invoiceId, emails, subject, message } = data

      const invoice = await this.crudBase.findOne({ id: invoiceId })

      if (invoice === null) throw new HttpException(400, 'Invoice Not Found')

      const attachment: Attachment[] = []

      if (invoice.file !== null) {
        attachment.push({
          filename: `${invoice.invoiceNo}.pdf`,
          path: invoice.file,
        })
      }

      this.mailerService
        .sendMail(emails, subject, message, attachment)
        .then(() => {
          AppLogger.getInstance().info(
            `Invoice ${invoiceId} shared successfully`
          )
        })
        .catch((e) => {
          AppLogger.getInstance().error(
            `Error in sharing invoice ${invoiceId}: ${e}`
          )
        })
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async downloadPurchaseInvoiceReport(
    startDate: Date,
    endDate: Date
  ): Promise<string> {
    try {
      let query: FindOptionsWhere<IPurchaseInvoice> = {
        invoiceDate: Between(startDate, endDate),
      }

      const data = await this.findAll(query, ['campaign', 'campaign.brand'], {
        invoiceDate: 'DESC',
      })

      const _data = data.map((value, index) => {
        return {
          SNo: index + 1,
          Campaign: value.campaign.name,
          Category:
            value.influencerProfile === null ? 'Agency Fee' : 'Influencer Fee',
          Brand: value.campaign.brand?.name,
          'Vendor Name': value.influencerProfile
            ? value.influencerProfile.firstName +
              (value.influencerProfile.lastName === null
                ? ''
                : ' ' + value.influencerProfile.lastName)
            : value.agencyProfile?.name,
          'Vendor PAN': value.pan,
          'Invoice No': value.invoiceNo,
          'Invoice Date': value.invoiceDate,
          'Total Amount': value.amount,
          IGST: value.igst,
          CGST: value.cgst,
          SGST: value.sgst,
          'Total Invoice Amount': value.totalAmount,
          TDS: value.tds,
          'Final Amount': value.finalAmount,
          'Amount Paid': value.finalAmount - value.balanceAmount,
          Balance: value.balanceAmount,
          'Payment Terms': value.paymentTerms,
          'TDS %': value.tdsPercentage,
          Section: value.tdsSection,
        }
      })

      const fields = [
        'SNo',
        'Campaign',
        'Category',
        'Brand',
        'Vendor Name',
        'Vendor PAN',
        'Invoice No',
        'Invoice Date',
        'Total Amount',
        'IGST',
        'CGST',
        'SGST',
        'Total Invoice Amount',
        'TDS',
        'Final Amount',
        'Amount Paid',
        'Balance',
        'Payment Terms',
        'TDS %',
        'Section',
      ]

      const csv = generateCSV(_data, fields)
      const filePath = './reports/purchase_invoice.csv'

      fs.writeFileSync(filePath, csv)

      const url = await uploadFileToFirebase(
        filePath,
        `reports/purchase_invoice.csv`
      )

      fs.unlinkSync(filePath)

      return url
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
