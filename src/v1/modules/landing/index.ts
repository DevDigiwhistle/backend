import { ContactUsFormCRUD, ContactUsConfigCRUD } from './crud'
import { ContactUsFormService, ContactUsConfigService } from './service'
import { ContactUsForm, ContactUsConfig } from './models'

const contactUsFormCRUD = ContactUsFormCRUD.getInstance(ContactUsForm)
const contactUsFormService = ContactUsFormService.getInstance(contactUsFormCRUD)

const contactUsConfigCRUD = ContactUsConfigCRUD.getInstance(ContactUsConfig)
const contactUsConfigService =
  ContactUsConfigService.getInstance(contactUsConfigCRUD)

export { contactUsFormService, contactUsConfigService }
