import { ContactUsController } from "../controller/contactUs.controller";
import { contactUsFormService } from "../modules/landing";
import { BaseValidator } from "../../utils";
import { Router } from "express";
import { contactUsFormSchema } from "../modules/landing/validators";


const contactUsController=new ContactUsController(contactUsFormService)
const contactUsValidator=new BaseValidator(contactUsFormSchema)

const contactUsRouter=Router()

contactUsRouter.post('/',contactUsValidator.validateInput.bind(contactUsValidator),
contactUsController.addController.bind(contactUsController))

export default contactUsRouter
