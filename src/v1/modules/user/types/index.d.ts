export type userStats = {
  approved: string
  pending: string
  rejected: string
}

export interface IAdminAndEmployeeDTO {
  userId: string
  email: string
  mobileNo: string
  designation: string
  isPaused: boolean
  isApproved: boolean | null
  firstName: string
  lastName: string
  profilePic: string
  profileId: string
  role: string
}

export type emailSearchDTO = {
  profileId: string
  profilePic: string | null
  email: string
}
