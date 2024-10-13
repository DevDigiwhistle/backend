import { Http } from 'winston/lib/winston/transports'
import { BaseService, HttpException } from '../../../../utils'
import {
  IPayroll,
  IPayrollCRUD,
  IPayrollHistory,
  IPayrollHistoryService,
  IPayrollService,
} from '../interface'
import { DeepPartial, FindOptionsOrder, FindOptionsWhere, ILike } from 'typeorm'
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

  async getAllPayroll(searchQuery: string): Promise<IPayroll[]> {
    try {
      let query: FindOptionsWhere<IPayroll>[] = []

      if (typeof searchQuery === 'string') {
        query = [
          {
            employeeProfile: {
              firstName: ILike(`%${searchQuery}%`),
            },
          },
          {
            employeeProfile: {
              lastName: ILike(`%${searchQuery}%`),
            },
          },
          {
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

      const updatedPayroll = await this.crudBase.update(
        { id: id },
        {
          salaryMonth: newSalaryMonth,
          workingDays: monthsToDays[newSalaryMonth],
          incentive: 0,
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
        paymentDate: new Date(),
      }
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
