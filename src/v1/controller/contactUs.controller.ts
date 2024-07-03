import { BaseController } from "../../utils";
import { IBaseController } from "../../utils/baseController";
import { IContactUsForm,IContactUsService } from "../modules/landing/interface";

interface IContactUsController extends IBaseController{}

export class ContactUsController extends BaseController<IContactUsForm> implements IContactUsController{
    constructor(contactUsService: IContactUsService){
        super(contactUsService)
    }
}

