import { FindOptionsWhere, ILike } from 'typeorm'
import { Enum } from '../../../../constants'
import { HttpException } from '../../../../utils'
import { BaseService, PaginatedResponse } from '../../../../utils/base-service'
import { IContactUsForm, IContactUsService } from '../interface'
import { IContactUsFormCRUD } from '../interface'

export class ContactUsFormService
  extends BaseService<IContactUsForm, IContactUsFormCRUD>
  implements IContactUsService
{
  private static instance: IContactUsService | null = null

  static getInstance(contactUsFormCRUD: IContactUsFormCRUD): IContactUsService {
    if (ContactUsFormService.instance === null) {
      ContactUsFormService.instance = new ContactUsFormService(
        contactUsFormCRUD
      )
    }
    return ContactUsFormService.instance
  }

  private constructor(contactUsFormCRUD: IContactUsFormCRUD) {
    super(contactUsFormCRUD)
  }

  async findAllContactUs(
    page: number,
    limit: number,
    name?: string,
    brands?: string,
    influencer?: string
  ): Promise<PaginatedResponse<IContactUsForm>> {
    try {
      let query: FindOptionsWhere<IContactUsForm>[] = []

      if (brands === 'true') {
        query.push({
          personType: Enum.PersonType.BRAND,
        })
      }

      if (influencer === 'true') {
        query.push({
          personType: Enum.PersonType.INFLUENCER,
        })
      }

      if (typeof name === 'string') {
        query.push({
          name: ILike(`%${name}%`),
        })
      }

      const data = await this.findAllPaginated(page, limit, query, [], {
        id: 'DESC',
      })

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
