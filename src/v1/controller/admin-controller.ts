import { Request, Response } from 'express'
import { errorHandler, HttpException } from '../../utils'
import { IAdminService, IEmployeeService } from '../modules/admin/interface'
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

      let name: string | undefined
      if (typeof req.query?.name === 'string') name = req.query.name

      const data = await this.userService.findAllAdminAndEmployees(
        parseInt(page),
        parseInt(limit),
        name
      )

      return responseHandler(200, res, 'Fetched Successfully', data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }

  async findStatsController(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.userService.findOverallUserStats()

      const _data = [
        {
          label: 'Approved',
          value: parseInt(data.approved),
          subValue: '',
          iconName: '',
        },
        {
          label: 'Rejected',
          value: parseInt(data.rejected),
          subValue: '',
          iconName: '',
        },
        {
          label: 'Pending',
          value: parseInt(data.pending),
          subValue: '',
          iconName: '',
        },
      ]
      return responseHandler(200, res, 'Fetched Successfully', _data)
    } catch (e) {
      return errorHandler(e, res)
    }
  }
}

export { AdminController }
