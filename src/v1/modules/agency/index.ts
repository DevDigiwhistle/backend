import { AgencyProfile, SearchCredits } from './models'
import { AgencyProfileService, SearchCreditsService } from './services'
import { AgencyProfileCRUD, SearchCreditsCRUD } from './crud'

const agencyProfileCRUD = AgencyProfileCRUD.getInstance(AgencyProfile)
const agencyProfileService = AgencyProfileService.getInstance(agencyProfileCRUD)

const searchCreditsCRUD = SearchCreditsCRUD.getInstance(SearchCredits)
const searchCreditsService = SearchCreditsService.getInstance(searchCreditsCRUD)

export { agencyProfileService, searchCreditsService }
