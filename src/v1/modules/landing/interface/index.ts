import { Enum } from '../../../../constants'
import { ICRUDBase } from '../../../../utils'
import { IBaseService } from '../../../../utils'

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
  extends IBaseService<IContactUsForm, IContactUsFormCRUD> {}
