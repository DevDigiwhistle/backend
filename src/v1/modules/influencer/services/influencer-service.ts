import { HttpException } from '../../../../utils'
import { IMailerService } from '../../../utils'
import { IGoogleAuthService, IRoleService } from '../../auth/interface'
import {
  IInfluencerService,
  IInfluencerCRUD,
  IInfluencerProfile,
} from '../interface'
import { IAddInfluencerInput, IInviteInfluencerInput } from '../types'

class InfluencerService implements IInfluencerService {
  private readonly mailerService: IMailerService
  private readonly googleAuthService: IGoogleAuthService
  private readonly influencerCRUD: IInfluencerCRUD
  private static instance: IInfluencerService | null = null

  static getInstance = (
    mailerService: IMailerService,
    googleAuthService: IGoogleAuthService,
    influencerCRUD: IInfluencerCRUD
  ) => {
    if (InfluencerService.instance === null) {
      InfluencerService.instance = new InfluencerService(
        mailerService,
        googleAuthService,
        influencerCRUD
      )
    }
    return InfluencerService.instance
  }

  private constructor(
    mailerService: IMailerService,
    googleAuthService: IGoogleAuthService,
    influencerCRUD: IInfluencerCRUD
  ) {
    this.mailerService = mailerService
    this.googleAuthService = googleAuthService
    this.influencerCRUD = influencerCRUD
  }

  async addInfluencer(data: IAddInfluencerInput): Promise<IInfluencerProfile> {
    try {
      const { uid } = await this.googleAuthService.createUser(data.email)

      const _data = await this.influencerCRUD.addInfluencer({
        ...data,
        userId: uid,
      })

      this.mailerService.sendMail(
        data.email,
        'You are invited to Join Digiwhistle',
        ''
      )

      return _data
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }

  async inviteInfluencer(data: IInviteInfluencerInput): Promise<void> {
    try {
      this.mailerService.sendMail(data.emails, data.subject, data.message)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.errorMessage)
    }
  }
}
export { InfluencerService }
