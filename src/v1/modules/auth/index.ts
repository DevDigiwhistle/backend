import { AxiosService, MailerService } from "../../utils";
import { GoogleAuthService, UserService,RoleService } from "./service";

import { UserCRUD,RoleCRUD } from "./crud";

import { User,Role } from "./models";

const roleCRUD=new RoleCRUD(Role)
const roleService=new RoleService(roleCRUD)

const axiosService=new AxiosService()
const googleAuthService=new GoogleAuthService(axiosService)
const mailerService=new MailerService()

const userCRUD=new UserCRUD(User)
const userService=new UserService(userCRUD,googleAuthService,roleService,mailerService)

export{
    roleService,
    userService
}

