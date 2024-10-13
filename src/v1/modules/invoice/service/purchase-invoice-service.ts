import { Between, FindOptionsWhere, ILike } from 'typeorm'
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

export class PurchaseInvoiceService
  extends BaseService<IPurchaseInvoice, IPurchaseInvoiceCRUD>
  implements IPurchaseInvoiceService
{
  private static instance: IPurchaseInvoiceService | null = null
  private readonly mailerService: IMailerService

  static getInstance = (
    purchaseInvoiceCRUD: IPurchaseInvoiceCRUD,
    mailerService: IMailerService
  ) => {
    if (PurchaseInvoiceService.instance === null) {
      PurchaseInvoiceService.instance = new PurchaseInvoiceService(
        purchaseInvoiceCRUD,
        mailerService
      )
    }
    return PurchaseInvoiceService.instance
  }

  private constructor(
    purchaseInvoiceCRUD: IPurchaseInvoiceCRUD,
    mailerService: IMailerService
  ) {
    super(purchaseInvoiceCRUD)
    this.mailerService = mailerService
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
      const { invoiceId, email, subject, message } = data

      this.mailerService
        .sendMail(email, subject, message)
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

  async downloadPurchaseInvoice(id: string): Promise<string> {
    try {
      return ''
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
        `reports/purchase_invoice_${new Date().toISOString()}.csv`
      )

      return url
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
