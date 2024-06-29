import { CRUDBase } from "../../../utils";
import { ICRUDBase } from "../../../utils/baseCrud";
import { IUser } from "../interface";
import { User } from "../models";

interface IUserCRUD extends ICRUDBase<IUser>{}

class UserCRUD extends CRUDBase<IUser> implements IUserCRUD{
    constructor(){
        super(User)
    }
}

export{
    UserCRUD,
    IUserCRUD
}