import { Request, Response } from 'express'
import { BaseValidator, errorHandler } from '../../utils'
import { IAdminService, IEmployeeService } from '../modules/admin/interface'
import { responseHandler } from '../../utils/response-handler'

class AdminController {
  private readonly adminService: IAdminService
  private readonly employeeService: IEmployeeService

  constructor(adminService: IAdminService, employeeService: IEmployeeService) {
    this.adminService = adminService
    this.employeeService = employeeService
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
}

export { AdminController }
