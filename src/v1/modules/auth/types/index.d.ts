import { IUser } from '../interface'

export type authDTO = {
  idToken: string
  role: string
}

export type loginDTO = {
  idToken: string
}

export type userDTO = {
  email: string
  uid: string
}

export type resetPassDTO = {
  oobCode: string
  password: string
}

export type loginResponseDTO = {
  token: string
  user: IUser
}

export type mobileDTO = {
  mobileNo: string
}

export type verifyMobileDTO = {
  mobileNo: string
  otp: string
}
