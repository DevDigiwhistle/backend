import Router from 'express'
import { PayrollController } from '../controller/payroll-controller'
import { payrollHistoryService, payrollService } from '../modules/payroll'
import { BaseValidator } from '../../utils'
import {
  addPayrollSchema,
  updatePayrollSchema,
} from '../modules/payroll/validators'
import { authorizeUser, verifyToken } from '../middleware'
import { Enum } from '../../constants'
import { authorizeAccounts } from '../middleware/authorizeAccounts'

const payrollRouter = Router()
const payrollController = new PayrollController(
  payrollService,
  payrollHistoryService
)

const addPayrollValidator = new BaseValidator(addPayrollSchema)
const updatePayrollValidator = new BaseValidator(updatePayrollSchema)

payrollRouter.post(
  '/',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  authorizeAccounts,
  addPayrollValidator.validateInput.bind(addPayrollValidator),
  payrollController.addController.bind(payrollController)
)

payrollRouter.patch(
  '/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  authorizeAccounts,
  updatePayrollValidator.validateInput.bind(updatePayrollValidator),
  payrollController.updateController.bind(payrollController)
)

payrollRouter.get(
  '/',
  verifyToken,
  authorizeAccounts,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  payrollController.getAllController.bind(payrollController)
)

payrollRouter.delete(
  '/:id',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  authorizeAccounts,
  payrollController.deleteController.bind(payrollController)
)

payrollRouter.post(
  '/release',
  verifyToken,
  authorizeUser([Enum.ROLES.ADMIN, Enum.ROLES.EMPLOYEE]),
  authorizeAccounts,
  payrollController.releaseSalaryController.bind(payrollController)
)

export default payrollRouter
