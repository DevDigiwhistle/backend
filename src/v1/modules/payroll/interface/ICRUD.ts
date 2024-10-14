import { ICRUDBase } from '../../../../utils'
import { IPayroll, IPayrollHistory } from './IModel'

export interface IPayrollCRUD extends ICRUDBase<IPayroll> {}

export interface IPayrollHistoryCRUD extends ICRUDBase<IPayrollHistory> {}
