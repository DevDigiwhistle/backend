import { ContactUsController } from "../controller/contactUs.controller";
import { ContactUsFormService } from "../modules/landing/service";
import { ContactUsFormCRUD } from "../modules/landing/crud";
import { ContactUsForm } from "../modules/landing/models";
import { BaseValidator } from "../../utils";
import { Router } from "express";
import { contactUsFormSchema } from "../modules/landing/validators";

const contactUsFormCRUD=new ContactUsFormCRUD(ContactUsForm)
const contactUsFormService=new ContactUsFormService(contactUsFormCRUD)
const contactUsController=new ContactUsController(contactUsFormService)
const contactUsValidator=new BaseValidator(contactUsFormSchema)

const contactUsRouter=Router()

contactUsRouter.post('/',contactUsValidator.validateInput.bind(contactUsValidator),
contactUsController.addController.bind(contactUsController))

export default contactUsRouter
