import { PayrollCRUD, PayrollHistoryCRUD } from './crud'
import { Payroll, PayrollHistory } from './models'
import { PayrollService } from './service'
import { PayrollHistoryService } from './service'

const payrollService = PayrollService.getInstance(
  PayrollCRUD.getInstance(Payroll)
)

const payrollHistoryService = PayrollHistoryService.getInstance(
  PayrollHistoryCRUD.getInstance(PayrollHistory)
)

export { payrollService, payrollHistoryService }
