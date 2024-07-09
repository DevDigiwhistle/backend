export type authDTO = {
  idToken: string
}

export type userDTO = {
  email: string
  uid: string
  roleId: number
}

export type resetPassDTO = {
  oobCode: string
  password: string
}
