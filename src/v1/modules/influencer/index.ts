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
import { searchCreditsService } from '../agency'

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

const instagramService = InstagramService.getInstance(
  AxiosService.getInstance()
)

const youtubeService = YoutubeService.getInstance(AxiosService.getInstance())

const twitterService = TwitterService.getInstance(AxiosService.getInstance())

const influencerService = InfluencerService.getInstance(
  MailerService.getInstance(),
  googleAuthService,
  InfluencerCRUD.getInstance(),
  InfluencerProfileService.getInstance(
    InfluencerProfileCRUD.getInstance(InfluencerProfile)
  ),
  influencerStatsService,
  instagramService,
  youtubeService,
  twitterService,
  searchCreditsService
)

export {
  influencerProfileService,
  influencerService,
  influencerStatsService,
  instagramService,
  youtubeService,
  twitterService,
}
