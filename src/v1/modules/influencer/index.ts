import {
  InfluencerProfile,
  InstagramProfileStats,
  TwitterProfileStats,
  YoutubeProfileStats,
} from './models'
import {
  InfluencerProfileCRUD,
  InfluencerCRUD,
  InstagramProfileStatsCRUD,
  YoutubeProfileStatsCRUD,
  TwitterProfileStatsCRUD,
} from './crud'
import {
  InfluencerProfileService,
  InfluencerService,
  InfluencerStatsService,
  InstagramProfileStatsService,
  InstagramService,
  TwitterProfileStatsService,
  TwitterService,
  YoutubeProfileStatsService,
  YoutubeService,
} from './services'
import { AxiosService, MailerService } from '../../utils'
import { googleAuthService } from '../auth'

const influencerProfileService = InfluencerProfileService.getInstance(
  InfluencerProfileCRUD.getInstance(InfluencerProfile)
)

const influencerStatsService = InfluencerStatsService.getInstance(
  InstagramService.getInstance(AxiosService.getInstance()),
  YoutubeService.getInstance(AxiosService.getInstance()),
  TwitterService.getInstance(AxiosService.getInstance()),
  InstagramProfileStatsService.getInstance(
    InstagramProfileStatsCRUD.getInstance(InstagramProfileStats)
  ),
  YoutubeProfileStatsService.getInstance(
    YoutubeProfileStatsCRUD.getInstance(YoutubeProfileStats)
  ),
  TwitterProfileStatsService.getInstance(
    TwitterProfileStatsCRUD.getInstance(TwitterProfileStats)
  )
)

const influencerService = InfluencerService.getInstance(
  MailerService.getInstance(),
  googleAuthService,
  InfluencerCRUD.getInstance(),
  InfluencerProfileService.getInstance(
    InfluencerProfileCRUD.getInstance(InfluencerProfile)
  ),
  influencerStatsService
)

export { influencerProfileService, influencerService, influencerStatsService }
