import { AxiosService, MailerService } from '../../utils'
import {
  GoogleAuthService,
  AuthService,
  RoleService,
  UserService,
} from './service'

import { UserCRUD, RoleCRUD } from './crud'

import { User, Role } from './models'

const roleCRUD = RoleCRUD.getInstance(Role)
const roleService = RoleService.getInstance(roleCRUD)

const axiosService = AxiosService.getInstance()
const googleAuthService = GoogleAuthService.getInstance(axiosService)
const mailerService = MailerService.getInstance()

const userCRUD = UserCRUD.getInstance(User)

const userService = UserService.getInstance(userCRUD)
const authService = AuthService.getInstance(
  userCRUD,
  googleAuthService,
  roleService,
  mailerService
)

export { roleService, authService, googleAuthService, userService }
