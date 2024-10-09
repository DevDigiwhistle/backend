import { Enum } from '../../../../constants'
import { IEmployeeProfile } from '../../admin/interface'

export interface IPayroll {
  employeeProfile: IEmployeeProfile
}

export interface IPayrollHistory {
  employeeProfile: IEmployeeProfile
  employment: Enum.EmploymentType
  ctc: number
  basic: number
  hra: number
  others: number
  workingDays: number
  salaryMonth: string
  incentive: number
  grossPay: number
  finalPay: number
  status: Enum.PaymentStatus
  paymentDate: Date
}
