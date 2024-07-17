import { HttpException } from '../../utils'
import { googleAuthService, userService } from '../modules/auth'
import { NextFunction, Request, Response } from 'express'
import { IUser } from '../modules/auth/interface'

export interface IExtendedRequest extends Request {
  user: IUser
}

export const verifyToken = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization

    if (token === null || token === undefined)
      throw new HttpException(401, 'Authorization Token Not Found!!')

    const uid = await googleAuthService.verifySessionCookie(token)
    const user = await userService.findOne({ id: uid })

    if (user === null) throw new HttpException(401, 'User does not exists!!')

    req.user = user
    next()
  } catch (e) {
    res.send(401).json({
      message: e?.message ?? 'You are not authorized!!',
    })
  }
}
