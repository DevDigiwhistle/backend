export type AddAdminOrEmployeeInput = {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  role: string
  designation: string
  profilePic?: string
}

export type AddEmployee = {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  roleId: number
  userId: string
}

export type AddAdmin = {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  roleId: number
  userId: string
}
