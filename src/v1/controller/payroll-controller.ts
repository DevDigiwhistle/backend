import { Request, Response } from 'express'
import { BaseController, errorHandler, HttpException } from '../../utils'
import {
  IPayroll,
  IPayrollCRUD,
  IPayrollHistoryService,
  IPayrollService,
} from '../modules/payroll/interface'
import { responseHandler } from '../../utils/response-handler'
import { monthsToDays } from '../../constants'
import { PayrollDTO } from '../dtos/payroll-dtos'

export class PayrollController extends BaseController<
  IPayroll,
  IPayrollCRUD,
  IPayrollService
> {
  private readonly payrollService: IPayrollService
  private readonly payrollHistoryService: IPayrollHistoryService

  constructor(
    payrollService: IPayrollService,
    payrollHistoryService: IPayrollHistoryService
  ) {
    super(payrollService)
    this.payrollHistoryService = payrollHistoryService
  }

  async addController(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body

      const salaryMonth =
        new Date(5.5 * 60 * 60 * 1000 + new Date().getTime()).getMonth() + 1
      const workingDays = monthsToDays[salaryMonth]

      const existingPayroll = await this.service.findOne({
        employeeProfile: {
          id: data.employeeProfile,
        },
      })

      if (existingPayroll !== null)
        throw new HttpException(400, 'Payroll for this employee already exists')

      const _data = await this.service.add({
        ...data,
        workingDays,
        salaryMonth,
      })

      return responseHandler(201, res, 'Added Successfully', _data, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async getAllController(req: Request, res: Response): Promise<Response> {
    try {
      const { searchQuery, type } = req.query

      const { startDate, endDate } = req.body

      if (typeof startDate !== 'string' || typeof endDate !== 'string') {
        throw new HttpException(400, 'Invalid Date')
      }

      const lowerBound = new Date(startDate)
      const upperBound = new Date(endDate)

      if (
        !(
          lowerBound instanceof Date && lowerBound.toISOString() === startDate
        ) ||
        !(upperBound instanceof Date && upperBound.toISOString() === endDate)
      ) {
        throw new HttpException(400, 'Invalid Date')
      }

      if (type === 'Pending') {
        const data = await this.service.getAllPayroll(
          searchQuery as string,
          lowerBound,
          upperBound
        )

        const _data = data.map((value) => {
          return PayrollDTO.transformationForPendingPayrollData(value)
        })

        return responseHandler(200, res, 'Fetched Successfully', _data, req)
      }

      if (type === 'All Paid') {
        const { page, limit } = req.query

        if (typeof page !== 'string' || typeof limit !== 'string')
          throw new HttpException(400, 'Invalid Page Details')

        const data = await this.payrollHistoryService.getAllPayrollHistory(
          parseInt(page),
          parseInt(limit),
          searchQuery as string,
          lowerBound,
          upperBound
        )

        const _data = data.data.map((value) => {
          return PayrollDTO.transformationForPaidPayrollData(value)
        })

        return responseHandler(
          200,
          res,
          'Fetched Successfully',
          {
            data: _data,
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            totalCount: data.totalCount,
          },
          req
        )
      }

      return responseHandler(200, res, 'Fetched Successfully', {}, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }

  async releaseSalaryController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { id } = req.query

      if (typeof id !== 'string') throw new HttpException(400, 'Invalid Id')

      const payrollHistoryData = await this.service.releaseSalary(id)

      await this.payrollHistoryService.add(payrollHistoryData)

      return responseHandler(200, res, 'Payment Done Successfully', {}, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }
}
