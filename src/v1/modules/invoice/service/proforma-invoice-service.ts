import { Http } from 'winston/lib/winston/transports'
import { AppLogger, BaseService, HttpException } from '../../../../utils'
import {
  IProformaInvoice,
  IProformaInvoiceCRUD,
  IProformaInvoiceService,
} from '../interface'
import { ShareInvoiceRequest } from '../types'
import { IMailerService } from '../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import { Between, FindOptionsWhere, ILike } from 'typeorm'

class ProformaInvoiceService
  extends BaseService<IProformaInvoice, IProformaInvoiceCRUD>
  implements IProformaInvoiceService
{
  private readonly mailerService: IMailerService
  private static instance: IProformaInvoiceService | null = null

  static getInstance = (
    proformaInvoiceCRUD: IProformaInvoiceCRUD,
    mailerService: IMailerService
  ) => {
    if (ProformaInvoiceService.instance === null) {
      ProformaInvoiceService.instance = new ProformaInvoiceService(
        proformaInvoiceCRUD,
        mailerService
      )
    }
    return ProformaInvoiceService.instance
  }

  private constructor(
    proformaInvoiceCRUD: IProformaInvoiceCRUD,
    mailerService: IMailerService
  ) {
    super(proformaInvoiceCRUD)
    this.mailerService = mailerService
  }

  async downloadProformaInvoice(id: string): Promise<string> {
    try {
      const proformaInvoice = await this.crudBase.findOne({ id: id })

      if (proformaInvoice === null)
        throw new HttpException(400, 'Proforma Invoice Not Found')

      return ''
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async shareProformaInvoice(data: ShareInvoiceRequest): Promise<void> {
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

  async getAllProformaInvoices(
    page: number,
    limit: number,
    startDate: Date,
    endDate: Date,
    invoiceNo: string
  ): Promise<PaginatedResponse<IProformaInvoice>> {
    try {
      let query: FindOptionsWhere<IProformaInvoice> = {
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
}

export { ProformaInvoiceService }
