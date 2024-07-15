import { BaseService } from '../../../../utils/baseService'
import { IContactUsForm, IContactUsService } from '../interface'
import { IContactUsFormCRUD } from '../interface'

export class ContactUsFormService
  extends BaseService<IContactUsForm>
  implements IContactUsService
{
  private static instance: IContactUsService | null = null

  static getInstance(contactUsFormCRUD: IContactUsFormCRUD) {
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
}
