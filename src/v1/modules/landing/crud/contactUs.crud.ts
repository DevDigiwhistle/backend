import { EntityTarget } from "typeorm";
import { CRUDBase } from "../../../../utils";
import { IContactUsForm } from "../interface";
import { IContactUsFormCRUD } from "../interface";

export class ContactUsFormCRUD extends CRUDBase<IContactUsForm> implements IContactUsFormCRUD{
    constructor(ContactUsForm: EntityTarget<IContactUsForm>){
        super(ContactUsForm)
    }
}

    