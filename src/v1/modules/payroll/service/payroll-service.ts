import { Http } from 'winston/lib/winston/transports'
import { BaseService, HttpException } from '../../../../utils'
import {
  IPayroll,
  IPayrollCRUD,
  IPayrollHistory,
  IPayrollHistoryService,
  IPayrollService,
} from '../interface'
import {
  Between,
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
} from 'typeorm'
import { Enum, monthIndexToName, monthsToDays } from '../../../../constants'

export class PayrollService
  extends BaseService<IPayroll, IPayrollCRUD>
  implements IPayrollService
{
  private static instance: IPayrollService | null = null

  static getInstance = (payrollCRUD: IPayrollCRUD) => {
    if (PayrollService.instance === null) {
      PayrollService.instance = new PayrollService(payrollCRUD)
    }
    return PayrollService.instance
  }

  private constructor(payrollCRUD: IPayrollCRUD) {
    super(payrollCRUD)
  }

  async getAllPayroll(
    searchQuery: string,
    lowerBound: Date,
    upperBound: Date
  ): Promise<IPayroll[]> {
    try {
      let Query: FindOptionsWhere<IPayroll> = {
        payrollDate: Between(lowerBound, upperBound),
      }
      let query: FindOptionsWhere<IPayroll>[] = []

      if (typeof searchQuery === 'string') {
        query = [
          {
            ...Query,
            employeeProfile: {
              firstName: ILike(`%${searchQuery}%`),
            },
          },
          {
            ...Query,
            employeeProfile: {
              lastName: ILike(`%${searchQuery}%`),
            },
          },
          {
            ...Query,
            employeeProfile: {
              user: {
                email: ILike(`%${searchQuery}%`),
              },
            },
          },
        ]
      }

      const order: FindOptionsOrder<IPayroll> = {
        employeeProfile: {
          user: {
            email: 'ASC',
          },
        },
        payrollDate: 'ASC',
      }

      const data = await this.crudBase.findAll(
        query,
        ['employeeProfile'],
        order
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async releaseSalary(id: string): Promise<DeepPartial<IPayrollHistory>> {
    try {
      const payroll = await this.crudBase.findOne({ id: id }, [
        'employeeProfile',
      ])

      if (payroll === null)
        throw new HttpException(400, 'Invalid Payroll Request')

      // razorpay payout api call

      const newSalaryMonth = (payroll.salaryMonth + 1) % 12
      const nextPayrollDate = new Date()
      nextPayrollDate.setDate(1)
      nextPayrollDate.setMonth(newSalaryMonth)
      nextPayrollDate.setHours(0, 0, 0, 0)
      if (newSalaryMonth === 0)
        nextPayrollDate.setFullYear(nextPayrollDate.getFullYear() + 1)

      await this.crudBase.update(
        { id: id },
        {
          salaryMonth: newSalaryMonth,
          workingDays: monthsToDays[newSalaryMonth],
          incentive: 0,
          payrollDate: nextPayrollDate,
        }
      )

      return {
        employeeProfile: {
          id: payroll.employeeProfile.id,
        },
        ctc: payroll.ctc,
        basic: payroll.basic,
        hra: payroll.hra,
        others: payroll.others,
        salaryMonth:
          monthIndexToName[newSalaryMonth] +
          ' ' +
          new Date().getFullYear().toString().slice(-2) +
          `(${monthsToDays[newSalaryMonth]} days)`,
        workingDays: payroll.workingDays.toString(),
        incentive: payroll.incentive,
        grossPay: payroll.ctc,
        finalPay: payroll.ctc * (1 - payroll.tds / 100) + payroll.incentive,
        status: Enum.PaymentStatus.PENDING,
        employment: Enum.EmploymentType.FULL_TIME,
        paymentDate: new Date(),
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
