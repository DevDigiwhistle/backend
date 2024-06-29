import { IBaseService,BaseService } from "../../../utils/baseService";
import { IUserCRUD } from "../crud";
import { IUser } from "../interface";

interface IUserService{}

class UserService{
    private userCRUD: IUserCRUD

    constructor(userCRUD: IUserCRUD){
        this.userCRUD=userCRUD
    }

    async signUp(){

    }

    async logIn(){

    }

    async resetPassword(){
        
    }
}

export{
    IUserService,
    UserService
}