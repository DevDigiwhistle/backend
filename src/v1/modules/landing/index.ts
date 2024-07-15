import { ContactUsFormCRUD } from './crud'
import { ContactUsFormService } from './service'
import { ContactUsForm } from './models'

const contactUsFormCRUD = ContactUsFormCRUD.getInstance(ContactUsForm)
const contactUsFormService = ContactUsFormService.getInstance(contactUsFormCRUD)

export { contactUsFormService }
