import { BaseService, HttpException } from '../../../../utils'
import { IEmployeeProfile, IEmployeeProfileCRUD } from '../interface'
import { IEmployeeProfileService } from '../interface/IService'

class EmployeeProfileService
  extends BaseService<IEmployeeProfile>
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

  async findByUserId(userId: string): Promise<IEmployeeProfile> {
    try {
      const data = await this.findOne({ userId: userId }, ['user'])

      if (data === null)
        throw new HttpException(404, 'Employee Profile does not exits!!')

      return data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { EmployeeProfileService }
