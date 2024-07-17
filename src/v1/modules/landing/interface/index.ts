import { Enum } from '../../../../constants'
import { ICRUDBase } from '../../../../utils'
import { IBaseService } from '../../../../utils'

export interface IContactUsForm {
  name: string
  email: string
  followersCount?: string | null
  profileLink?: string | null
  mobileNo?: string | null
  message?: string | null
  personType: Enum.PersonType
}

export interface IContactUsFormCRUD extends ICRUDBase<IContactUsForm> {}

export interface IContactUsService
  extends IBaseService<IContactUsForm, IContactUsFormCRUD> {}
