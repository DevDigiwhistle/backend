import { AxiosService, MailerService } from '../../utils'
import {
  GoogleAuthService,
  AuthService,
  RoleService,
  UserService,
  AuthTokenService,
  VerificationService,
  WhatsappService,
} from './service'

import { UserCRUD, RoleCRUD, VerificationCRUD } from './crud'

import { User, Role, Verification } from './models'

const roleCRUD = RoleCRUD.getInstance(Role)
const roleService = RoleService.getInstance(roleCRUD)

const axiosService = AxiosService.getInstance()
const googleAuthService = GoogleAuthService.getInstance(axiosService)
const mailerService = MailerService.getInstance()

const userCRUD = UserCRUD.getInstance(User)
const verificationCRUD = VerificationCRUD.getInstance(Verification)

const authTokenService = AuthTokenService.getInstance()
const verificationService = VerificationService.getInstance(verificationCRUD)
const whatsappService = WhatsappService.getInstance(axiosService)

const userService = UserService.getInstance(userCRUD)
const authService = AuthService.getInstance(
  userService,
  googleAuthService,
  roleService,
  mailerService,
  whatsappService,
  verificationService,
  authTokenService
)

export {
  roleService,
  authService,
  googleAuthService,
  userService,
  authTokenService,
}
