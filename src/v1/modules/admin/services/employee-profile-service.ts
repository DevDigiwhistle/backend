import { BaseService, HttpException } from '../../../../utils'
import { IEmployeeProfile, IEmployeeProfileCRUD } from '../interface'
import { IEmployeeProfileService } from '../interface/IService'

class EmployeeProfileService
  extends BaseService<IEmployeeProfile, IEmployeeProfileCRUD>
  implements IEmployeeProfileService
{
  private static instance: IEmployeeProfileService | null = null

  static getInstance(EmployeeProfileCRUD: IEmployeeProfileCRUD) {
    if (EmployeeProfileService.instance === null) {
      EmployeeProfileService.instance = new EmployeeProfileService(
        EmployeeProfileCRUD
      )
    }

    return EmployeeProfileService.instance
  }

  private constructor(employeeProfileCRUD: IEmployeeProfileCRUD) {
    super(employeeProfileCRUD)
  }
}

export { EmployeeProfileService }
