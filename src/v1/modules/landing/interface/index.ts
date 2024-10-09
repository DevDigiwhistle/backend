import { Enum } from '../../../../constants'
import { ICRUDBase } from '../../../../utils'
import { IBaseService } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'

export interface IContactUsForm {
  id: number
  name: string
  email: string
  followersCount?: string | null
  profileLink?: string | null
  mobileNo?: string | null
  message?: string | null
  personType: Enum.PersonType
  viewed: boolean
}

export interface IContactUsFormCRUD extends ICRUDBase<IContactUsForm> {}

export interface IContactUsService
  extends IBaseService<IContactUsForm, IContactUsFormCRUD> {
  findAllContactUs(
    page: number,
    limit: number,
    name?: string,
    brands?: string,
    influencer?: string
  ): Promise<PaginatedResponse<IContactUsForm>>
}
