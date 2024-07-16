import { BaseController } from '../../utils'
import { IBaseController } from '../../utils/baseController'
import {
  IEmployeeProfile,
  IEmployeeProfileService,
} from '../modules/employee/interface'

interface IEmployeeProfileController extends IBaseController {}

export class EmployeeProfileController
  extends BaseController<IEmployeeProfile>
  implements IEmployeeProfileController
{
  constructor(employeeProfileService: IEmployeeProfileService) {
    super(employeeProfileService)
  }
}
