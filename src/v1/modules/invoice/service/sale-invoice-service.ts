import { Between, FindOptionsWhere, ILike } from 'typeorm'
import {
  AppLogger,
  BaseService,
  HttpException,
  uploadFileToFirebase,
} from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import {
  ISaleInvoice,
  ISaleInvoiceCRUD,
  ISaleInvoiceService,
} from '../interface'
import { ShareInvoiceRequest } from '../types'
import { IMailerService } from '../../../utils'
import { generateCSV } from '../utils'
import fs from 'fs'

export class SaleInvoiceService
  extends BaseService<ISaleInvoice, ISaleInvoiceCRUD>
  implements ISaleInvoiceService
{
  private static instance: ISaleInvoiceService | null = null
  private readonly mailerService: IMailerService

  static getInstance = (
    saleInvoiceCRUD: ISaleInvoiceCRUD,
    mailerService: IMailerService
  ) => {
    if (SaleInvoiceService.instance === null) {
      SaleInvoiceService.instance = new SaleInvoiceService(
        saleInvoiceCRUD,
        mailerService
      )
    }
    return SaleInvoiceService.instance
  }

  private constructor(
    saleInvoiceCRUD: ISaleInvoiceCRUD,
    mailerService: IMailerService
  ) {
    super(saleInvoiceCRUD)
    this.mailerService = mailerService
  }

  async getAllSaleInvoices(
    page: number,
    limit: number,
    startDate: Date,
    endDate: Date,
    invoiceNo: string
  ): Promise<PaginatedResponse<ISaleInvoice>> {
    try {
      let query: FindOptionsWhere<ISaleInvoice> = {
        invoiceDate: Between(startDate, endDate),
      }

      if (typeof invoiceNo === 'string' && invoiceNo !== '') {
        query = { ...query, invoiceNo: ILike(`%${invoiceNo}%`) }
      }

      const data = await this.crudBase.findAllPaginated(
        page,
        limit,
        query,
        [
          'campaign',
          'campaign.participants',
          'campaign.participants.deliverables',
          'campaign.brand',
          'campaign.participants.influencerProfile',
          'campaign.participants.agencyProfile',
        ],
        {
          invoiceDate: 'DESC',
        }
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async shareSaleInvoice(data: ShareInvoiceRequest): Promise<void> {
    try {
      const { invoiceId, emails, subject, message } = data

      this.mailerService
        .sendMail(emails, subject, message)
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

  async downloadSaleInvoice(id: string): Promise<string> {
    try {
      return ''
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async downloadSaleInvoiceReport(
    startDate: Date,
    endDate: Date
  ): Promise<string> {
    try {
      let query: FindOptionsWhere<ISaleInvoice> = {
        invoiceDate: Between(startDate, endDate),
      }

      const data = await this.findAll(query, ['campaign', 'campaign.brand'], {
        invoiceDate: 'DESC',
      })

      const _data = data.map((value, index) => {
        return {
          SNo: index + 1,
          Campaign: value.campaign.name,
          Client: value.campaign.brand?.name,
          GSTIN: value.gstTin,
          BillNo: value.invoiceNo,
          InvoiceDate: value.invoiceDate,
          TaxableAmt: value.amount,
          IGST: value.igst,
          CGST: value.cgst,
          SGST: value.sgst,
          Total: value.total,
          TDS: value.tds,
          Received: value.received,
          Balance: value.balanceAmount,
          Month: value.month,
        }
      })

      const fields = [
        'SNo',
        'Campaign',
        'Client',
        'GSTIN',
        'BillNo',
        'InvoiceDate',
        'TaxableAmt',
        'IGST',
        'CGST',
        'SGST',
        'Total',
        'TDS',
        'Received',
        'Balance',
        'Month',
      ]

      const csv = generateCSV(_data, fields)
      const filePath = './reports/sale_invoice.csv'

      fs.writeFileSync(filePath, csv)

      const url = await uploadFileToFirebase(
        filePath,
        `reports/sale_invoice.csv`
      )

      return url
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
