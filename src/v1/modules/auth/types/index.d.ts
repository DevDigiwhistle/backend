import { IAdminProfile, IEmployeeProfile } from '../../admin/interface'
import { IAgencyProfile, IBrandProfile } from '../../brands/interface'
import { IInfluencerProfile } from '../../influencer/interface'

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
  user: userResponse
}

export type signUpResponseDTO = {
  id: string
  email: string
  role: string
  isVerified: boolean
}

export type mobileDTO = {
  mobileNo: string
}

export type verifyMobileDTO = {
  mobileNo: string
  otp: string
}

export type userResponse = {
  id: string
  email: string
  role: string
  isVerified: boolean
  isPaused: boolean
  profile:
    | IAdminProfile
    | IEmployeeProfile
    | IAgencyProfile
    | IBrandProfile
    | IInfluencerProfile
  isOnBoarded?: boolean
}

// export type userProfileDTO = {
//   userId: string
//   email: string
//   role: string
//   isVerified: boolean
//   isPaused: boolean
//   isApproved: boolean
//   name: string
//   mobileNo: string
//   profilePic: string | null
// }
