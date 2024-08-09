import { Request, Response } from 'express'
import { BaseValidator, errorHandler, HttpException } from '../../utils'
import {
  IAdminProfile,
  IAdminService,
  IEmployeeProfile,
  IEmployeeService,
} from '../modules/admin/interface'
import { responseHandler } from '../../utils/response-handler'
import { IUserService } from '../modules/auth/interface'

class AdminController {
  private readonly adminService: IAdminService
  private readonly employeeService: IEmployeeService
  private readonly userService: IUserService

  constructor(
    adminService: IAdminService,
    employeeService: IEmployeeService,
    userService: IUserService
  ) {
    this.adminService = adminService
    this.employeeService = employeeService
    this.userService = userService
  }

  async addAdminOrEmployeeController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = req.body
      if (data.role === 'admin') await this.adminService.addAdmin(req.body)

      if (data.role === 'employee')
        await this.employeeService.addEmployee(req.body)

      return responseHandler(200, res, 'Added Successfully', {})
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async getAllAdminAndEmployees(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, limit } = req.query

      if (typeof page !== 'string' || typeof limit !== 'string')
        throw new HttpException(400, 'Invalid Page Details')

      const data = await this.userService.findAllPaginated(
        parseInt(page),
        parseInt(limit),
        [
          {
            role: {
              id: 1,
            },
          },
          {
            role: {
              id: 2,
            },
          },
        ],
        ['adminProfile', 'employeeProfile', 'role']
      )

      const _data = data.data.map((item) => {
        const profile: IEmployeeProfile | IAdminProfile =
          item[`${item.role.name}Profile`]
        return {
          userId: item.id,
          email: item.email,
          isVerified: item.isVerified,
          mobileNo: profile.mobileNo,
          designation:
            item.role.name === 'admin' ? 'admin' : profile.designation,
          isPaused: item.isPaused,
          firstName: profile.firstName,
          lastName: profile.lastName,
          profilePic: profile.profilePic,
          profileId: profile.id,
          role: item.role.name,
        }
      })

      return responseHandler(200, res, 'Fetched Successfully', {
        data: _data,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
        currentPage: data.currentPage,
      })
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { AdminController }
