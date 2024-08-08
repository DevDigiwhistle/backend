import { IAdminCRUD } from '../interface/ICRUD'
import { AddAdmin } from '../types'
import { AppDataSource } from '../../../../config'
import { User } from '../../auth/models'
import { AdminProfile } from '../models'
import { HttpException } from '../../../../utils'

class AdminCRUD implements IAdminCRUD {
  async addAdmin(data: AddAdmin): Promise<void> {
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

      const adminProfileRepository =
        queryRunner.manager.getRepository(AdminProfile)
      const adminProfile = new AdminProfile()
      adminProfile.firstName = data.firstName
      adminProfile.lastName = data.lastName
      adminProfile.mobileNo = data.mobileNo
      adminProfile.user.id = data.userId
      await adminProfileRepository.save(adminProfile)

      await queryRunner.commitTransaction()
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(e?.errorCode, e?.message)
    } finally {
      await queryRunner.release()
    }
  }
}

export { AdminCRUD }
