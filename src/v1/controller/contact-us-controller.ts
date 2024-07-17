import { BaseController } from '../../utils'
import { IBaseController } from '../../utils/base-controller'
import {
  IContactUsForm,
  IContactUsFormCRUD,
  IContactUsService,
} from '../modules/landing/interface'

interface IContactUsController
  extends IBaseController<
    IContactUsForm,
    IContactUsFormCRUD,
    IContactUsService
  > {}

export class ContactUsController
  extends BaseController<IContactUsForm, IContactUsFormCRUD, IContactUsService>
  implements IContactUsController
{
  constructor(contactUsService: IContactUsService) {
    super(contactUsService)
  }
}
