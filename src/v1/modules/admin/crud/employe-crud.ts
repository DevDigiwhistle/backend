import { IEmployeeCRUD } from '../interface/ICRUD'
import { AddEmployee } from '../types'
import { AppDataSource } from '../../../../config'
import { User } from '../../auth/models'
import { EmployeeProfile } from '../models'

class EmployeeCRUD implements IEmployeeCRUD {
  async addEmployee(data: AddEmployee): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    try {
      await queryRunner.startTransaction()

      const userRepository = queryRunner.manager.getRepository(User)
      const user = new User()
      user.id = data.userId
      user.email = data.email
      user.role.id = data.roleId
      user.isVerified = true
      await userRepository.save(user)

      const employeeProfileRepository =
        queryRunner.manager.getRepository(EmployeeProfile)
      const employeeProfile = new EmployeeProfile()
      employeeProfile.firstName = data.firstName
      employeeProfile.lastName = data.lastName
      employeeProfile.mobileNo = data.mobileNo
      employeeProfile.user.id = data.userId
      await employeeProfileRepository.save(employeeProfile)

      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}

export { EmployeeCRUD }
