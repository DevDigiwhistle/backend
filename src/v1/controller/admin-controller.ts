import { Request, Response } from 'express'
import { errorHandler, HttpException } from '../../utils'
import {
  IAdminProfile,
  IAdminService,
  IEmployeeProfile,
  IEmployeeService,
} from '../modules/admin/interface'
import { responseHandler } from '../../utils/response-handler'
import { IUser, IUserService } from '../modules/user/interface'
import { PaginatedResponse } from '../../utils/base-service'
import { IAdminAndEmployeeDTO } from '../modules/user/types'

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

  private adminAndEmployeeDTO(
    data: PaginatedResponse<IUser>
  ): PaginatedResponse<IAdminAndEmployeeDTO> {
    const _data = data.data.map((item) => {
      const profile: IEmployeeProfile | IAdminProfile =
        item[`${item.role.name}Profile`]

      return {
        userId: item.id,
        email: item.email,
        mobileNo: profile.mobileNo,
        designation: item.role.name === 'admin' ? 'admin' : profile.designation,
        isPaused: item.isPaused,
        isApproved: item.isApproved,
        firstName: profile.firstName,
        lastName: profile.lastName,
        profilePic: profile.profilePic,
        profileId: profile.id,
        role: item.role.name,
      }
    })

    return {
      data: _data,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalCount: data.totalCount,
    }
  }

  async addAdminOrEmployeeController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = req.body

      const { email, mobileNo } = req.body

      const user = await this.userService.findUserByMobileNoAndEmail(
        mobileNo,
        email
      )

      if (user !== null)
        throw new HttpException(409, 'User already exist with same details')

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

      let name: string | undefined
      if (typeof req.query?.name === 'string') name = req.query.name

      const data = await this.userService.findAllAdminAndEmployees(
        parseInt(page),
        parseInt(limit),
        name
      )

      const _data = this.adminAndEmployeeDTO(data)

      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async findStatsController(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.userService.findOverallUserStats()

      const _data = [
        {
          label: 'Accepted Requests',
          value: parseInt(data.approved),
          subValue: '',
          iconName: 'FaceSmileIcon',
        },
        {
          label: 'Pending Requests',
          value: parseInt(data.pending),
          subValue: '',
          iconName: 'ExclamationCircleIcon',
        },
        {
          label: 'Declined Requests',
          value: parseInt(data.rejected),
          subValue: '',
          iconName: 'FaceFrownIcon',
        },
      ]
      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { AdminController }
