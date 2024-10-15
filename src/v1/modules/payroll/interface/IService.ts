import { DeepPartial } from 'typeorm'
import { IBaseService } from '../../../../utils'
import { PaginatedResponse } from '../../../../utils/base-service'
import { IPayrollCRUD, IPayrollHistoryCRUD } from './ICRUD'
import { IPayroll, IPayrollHistory } from './IModel'

export interface IPayrollService extends IBaseService<IPayroll, IPayrollCRUD> {
  getAllPayroll(
    searchQuery: string,
    lowerBound: Date,
    upperBound: Date
  ): Promise<IPayroll[]>
  releaseSalary(id: string): Promise<DeepPartial<IPayrollHistory>>
}

export interface IPayrollHistoryService
  extends IBaseService<IPayrollHistory, IPayrollHistoryCRUD> {
  getAllPayrollHistory(
    page: number,
    limit: number,
    searchQuery: string,
    lowerBound: Date,
    upperBound: Date
  ): Promise<PaginatedResponse<IPayrollHistory>>
}
