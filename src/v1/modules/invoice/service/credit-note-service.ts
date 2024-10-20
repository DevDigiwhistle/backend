import { BaseService, HttpException } from '../../../../utils'
import { ICreditNote, ICreditNoteCRUD, ICreditNoteService } from '../interface'

class CreditNoteService extends BaseService<ICreditNote, ICreditNoteCRUD> {
  private static instance: ICreditNoteService | null = null

  static getInstance = (creditNoteCRUD: ICreditNoteCRUD) => {
    if (CreditNoteService.instance === null)
      CreditNoteService.instance = new CreditNoteService(creditNoteCRUD)

    return CreditNoteService.instance
  }

  private constructor(creditNoteCRUD: ICreditNoteCRUD) {
    super(creditNoteCRUD)
  }

  async downloadCreditNote(invoiceId: string): Promise<string> {
    try {
      const creditNote = await this.crudBase.findOne({
        invoice: {
          id: invoiceId,
        },
      })

      return ''
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CreditNoteService }
