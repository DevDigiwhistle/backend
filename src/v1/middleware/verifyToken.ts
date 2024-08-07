import { HttpException } from '../../utils'
import { authTokenService, userService } from '../modules/auth'
import { NextFunction, Response } from 'express'
import { IExtendedRequest } from '../interface'

export const verifyToken = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization

    if (token === null || token === undefined)
      throw new HttpException(401, 'Authorization Token Not Found!!')

    token = token.split(' ')[1]

    const uid = authTokenService.decodeToken(token)
    const user = await userService.findOne({ id: uid }, ['role'])

    if (user === null) throw new HttpException(401, 'User does not exists!!')

    req.user = user
    next()
  } catch (e) {
    res.status(401).json({
      message: e?.message ?? 'You are not authorized!!',
      status: 'Authentication Failed!!',
    })
  }
}
