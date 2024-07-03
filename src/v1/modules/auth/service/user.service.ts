import { HttpException } from '../../../../utils'
import { type IUserCRUD } from '../interface'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { type LoginDTO, type SignUpDTO } from '../types/auth'
import { IUserService } from '../interface'

class UserService implements IUserService {
  private readonly userCRUD: IUserCRUD

  constructor(userCRUD: IUserCRUD) {
    this.userCRUD = userCRUD
  }

  async signUp(signUpData: SignUpDTO): Promise<string> {
    try {
      const { email, password, name, role } = signUpData
      const hashedPassword = bcrypt.hashSync(password, 10)

      const userData = {
        name,
        email,
        password: hashedPassword,
        role,
      }

      const data = await this.userCRUD.add(userData as any)
      const token = jwt.sign({ id: data.id }, process.env.SECRET ?? '')
      return token
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async logIn(loginData: LoginDTO): Promise<string> {
    return ''
  }

  // async resetPassword() { }
}

export { type IUserService, UserService }
