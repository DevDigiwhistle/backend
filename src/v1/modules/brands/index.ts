import { BrandProfile } from './models'
import { BrandProfileService } from './services'
import { BrandProfileCRUD } from './crud'

const brandProfileCRUD = BrandProfileCRUD.getInstance(BrandProfile)
const brandProfileService = BrandProfileService.getInstance(brandProfileCRUD)

export { brandProfileService }
