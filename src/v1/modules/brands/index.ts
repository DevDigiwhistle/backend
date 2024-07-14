import { BrandProfile } from './models'
import { BrandProfileCRUD } from './crud/brand-profile-crud'
import { BrandProfileService } from './services'

const brandProfileCRUD = BrandProfileCRUD.getInstance(BrandProfile)
const brandProfileService = BrandProfileService.getInstance(brandProfileCRUD)

export { brandProfileService }
