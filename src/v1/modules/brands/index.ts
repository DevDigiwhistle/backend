import { BrandProfile, AgencyProfile } from './models'
import { BrandProfileService, AgencyProfileService } from './services'
import { AgencyProfileCRUD, BrandProfileCRUD } from './crud'

const brandProfileCRUD = BrandProfileCRUD.getInstance(BrandProfile)
const brandProfileService = BrandProfileService.getInstance(brandProfileCRUD)

const agencyProfileCRUD = AgencyProfileCRUD.getInstance(AgencyProfile)
const agencyProfileService = AgencyProfileService.getInstance(agencyProfileCRUD)

export { brandProfileService, agencyProfileService }
