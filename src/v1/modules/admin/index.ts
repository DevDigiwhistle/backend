import { AdminProfile } from './models'
import { AdminProfileCRUD } from './crud'
import { AdminProfileService } from './services'

const adminProfileCRUD = AdminProfileCRUD.getInstance(AdminProfile)
const adminProfileService = AdminProfileService.getInstance(adminProfileCRUD)

export { adminProfileService }
