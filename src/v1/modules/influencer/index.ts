import { InfluencerProfile } from './models'
import { InfluencerProfileCRUD } from './crud'
import { InfluencerProfileService } from './services'

const influencerProfileCRUD =
  InfluencerProfileCRUD.getInstance(InfluencerProfile)
const influencerProfileService = InfluencerProfileService.getInstance(
  influencerProfileCRUD
)

export { influencerProfileService }
