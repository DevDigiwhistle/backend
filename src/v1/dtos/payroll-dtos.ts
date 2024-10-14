import { monthIndexToName, monthsToDays } from '../../constants'
import { IPayroll, IPayrollHistory } from '../modules/payroll/interface'

export class PayrollDTO {
  static transformationForPendingPayrollData(data: IPayroll) {
    const { employeeProfile, salaryMonth, ...payroll } = data

    return {
      name:
        employeeProfile?.firstName +
        (employeeProfile?.lastName ? ' ' + employeeProfile?.lastName : ''),
      email: employeeProfile?.user?.email,
      ...payroll,
      salaryMonth:
        monthIndexToName[salaryMonth] + `(${monthsToDays[salaryMonth]} days)`,
      bankName: employeeProfile?.bankName,
      bankAccountNumber: employeeProfile?.bankAccountNumber,
      bankIfscCode: employeeProfile?.bankIfscCode,
      panNo: employeeProfile?.panNo,
      grossPay: payroll.ctc,
      tds: (payroll.tds / 100) * payroll.ctc,
      finalPay:
        payroll.ctc - (payroll.tds / 100) * payroll.ctc + payroll.incentive,
    }
  }

  static transformationForPaidPayrollData(data: IPayrollHistory) {
    const { employeeProfile, ...payrollHistory } = data

    return {
      name:
        employeeProfile?.firstName +
        (employeeProfile?.lastName ? ' ' + employeeProfile?.lastName : ''),
      email: employeeProfile?.user?.email,
      ...payrollHistory,
    }
  }
}
