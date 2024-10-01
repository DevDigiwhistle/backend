import { errorHandler, HttpException } from '../../utils'
import { IExtendedRequest } from '../interface'
import { IUserService } from '../modules/user/interface'
import { Request, Response } from 'express'
import { userResponseDTO } from '../modules/auth/types'
import { responseHandler } from '../../utils/response-handler'
import { IGoogleAuthService } from '../modules/auth/interface'

interface IUserController {
  getUser(req: Request, res: Response): Promise<Response>
  approveUser(req: Request, res: Response): Promise<Response>
  pauseUser(req: Request, res: Response): Promise<Response>
  rejectUser(req: Request, res: Response): Promise<Response>
  revertAction(req: Request, res: Response): Promise<Response>
  deleteUser(req: Request, res: Response): Promise<Response>
}

class UserController implements IUserController {
  private readonly userService: IUserService
  private readonly googleAuthService: IGoogleAuthService

  constructor(
    userService: IUserService,
    googleAuthService: IGoogleAuthService
  ) {
    this.userService = userService
    this.googleAuthService = googleAuthService
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

      if (_user.role === 'brand' || _user.role === 'agency') {
        const _response = {
          ..._user,
          profile: {
            id: _user.profile.id,
            firstName: _user.profile.pocFirstName,
            lastName: _user.profile.pocLastName,
            name: _user.profile.name,
            websiteURL: _user.profile.websiteURL,
            mobileNo: _user.profile.mobileNo,
            profilePic: _user.profile.profilePic,
          },
        }
        return responseHandler(200, res, 'user fetched successfully', _response)
      } else {
        return responseHandler(200, res, 'user fetched successfully', _user)
      }
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

      return responseHandler(200, res, 'User approved', {})
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

      return responseHandler(200, res, 'User paused', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async revertAction(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body

      if (typeof userId !== 'string') {
        throw new HttpException(400, 'Invalid UserId')
      }

      await this.userService.update(
        { id: userId },
        { isVerified: false, isPaused: false, isApproved: null }
      )

      return responseHandler(200, res, 'Reverted Action', {})
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

      return responseHandler(200, res, 'User rejected', {})
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

      await this.googleAuthService.deleteUser(userId)

      await this.userService.delete({
        id: userId,
      })

      return responseHandler(200, res, 'Deleted Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { UserController }
