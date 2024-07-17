import { Enum } from '../../constants'
import { Response, NextFunction } from 'express'
import { IExtendedRequest } from '../interface'

export const authorizeUser = (allowedUser: Enum.ROLES[]) => {
  return (req: IExtendedRequest, res: Response, next: NextFunction) => {
    const roleId = req.user?.roleId

    if (roleId === undefined || !allowedUser.includes(roleId)) {
      res.send(403).json({ message: 'Access Denied!!' })
      return
    }

    next()
  }
}
