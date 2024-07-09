import { ContactUsFormCRUD } from "./crud"
import { ContactUsFormService } from "./service"
import { ContactUsForm } from "./models"


const contactUsFormCRUD=new ContactUsFormCRUD(ContactUsForm)
const contactUsFormService=new ContactUsFormService(contactUsFormCRUD)

export {
    contactUsFormService
}