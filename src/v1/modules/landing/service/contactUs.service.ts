import { BaseService } from '../../../../utils/baseService'
import { IContactUsForm, IContactUsService } from '../interface'
import { IContactUsFormCRUD } from '../interface'

export class ContactUsFormService
  extends BaseService<IContactUsForm>
  implements IContactUsService
{
  constructor(contactUsFormCRUD: IContactUsFormCRUD) {
    super(contactUsFormCRUD)
  }
}
