import { errorHandler, HttpException } from '../../utils'
import { IExtendedRequest } from '../interface'
import { IUserService } from '../modules/auth/interface'
import { Request, Response } from 'express'
import { userResponseDTO } from '../modules/auth/types'
import { responseHandler } from '../../utils/response-handler'

interface IUserController {
  getUser(req: Request, res: Response): Promise<Response>
  approveUser(req: Request, res: Response): Promise<Response>
  pauseUser(req: Request, res: Response): Promise<Response>
  deleteUser(req: Request, res: Response): Promise<Response>
}

class UserController implements IUserController {
  private readonly userService: IUserService

  constructor(userService: IUserService) {
    this.userService = userService
  }

  async getUser(req: IExtendedRequest, res: Response): Promise<Response> {
    try {
      const user = await this.userService.findOne({ id: req.user.id }, [
        'adminProfile',
        'employeeProfile',
        'influencerProfile',
        'brandProfile',
        'agencyProfile',
        'role',
      ])

      if (user === null) throw new HttpException(404, 'user does not exist')

      const profile = user[`${user.role.name}Profile`]

      const _user: userResponseDTO = {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
        isPaused: user.isPaused,
        profile: profile,
        isOnBoarded: true,
        role: user.role.name,
      }

      return responseHandler(200, res, 'user fetched successfully', _user)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async approveUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body
      if (typeof userId !== 'string') {
        throw new HttpException(400, 'Invalid UserId')
      }

      await this.userService.update(
        { id: userId },
        { isVerified: true, isPaused: false, isApproved: true }
      )

      return responseHandler(200, res, 'Approved User', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async pauseUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body

      if (typeof userId !== 'string') {
        throw new HttpException(400, 'Invalid UserId')
      }

      await this.userService.update(
        { id: userId },
        { isPaused: true, isVerified: false }
      )

      return responseHandler(200, res, 'Paused User', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async rejectUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body

      if (typeof userId !== 'string') {
        throw new HttpException(400, 'Invalid UserId')
      }

      await this.userService.update(
        { id: userId },
        { isVerified: false, isPaused: false, isApproved: false }
      )

      return responseHandler(200, res, 'Paused User', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.query

      if (typeof userId !== 'string') {
        throw new HttpException(400, 'Invalid UserId')
      }
      await this.userService.delete({
        id: userId,
      })

      return responseHandler(204, res, 'Deleted Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { UserController }
