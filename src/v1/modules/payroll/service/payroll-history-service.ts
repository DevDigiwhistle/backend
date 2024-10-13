import { FindOptionsOrder, FindOptionsWhere, ILike } from 'typeorm'
import { BaseService, HttpException } from '../../../../utils'
import {
  IPayroll,
  IPayrollHistory,
  IPayrollHistoryCRUD,
  IPayrollHistoryService,
} from '../interface'
import { PaginatedResponse } from '../../../../utils/base-service'

export class PayrollHistoryService
  extends BaseService<IPayrollHistory, IPayrollHistoryCRUD>
  implements IPayrollHistoryService
{
  private static instance: IPayrollHistoryService | null = null

  static getInstance = (payrollHistoryCRUD: IPayrollHistoryCRUD) => {
    if (PayrollHistoryService.instance === null) {
      PayrollHistoryService.instance = new PayrollHistoryService(
        payrollHistoryCRUD
      )
    }
    return PayrollHistoryService.instance
  }

  private constructor(payrollHistoryCRUD: IPayrollHistoryCRUD) {
    super(payrollHistoryCRUD)
  }

  async getAllPayrollHistory(
    page: number,
    limit: number,
    searchQuery: string
  ): Promise<PaginatedResponse<IPayrollHistory>> {
    try {
      let query: FindOptionsWhere<IPayrollHistory>[] = []

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

      const order: FindOptionsOrder<IPayrollHistory> = {
        createdAt: 'DESC',
      }

      const data = await this.crudBase.findAllPaginated(
        page,
        limit,
        query,
        ['employeeProfile'],
        order
      )

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}
