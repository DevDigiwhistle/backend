import { DeepPartial, EntityTarget } from 'typeorm'
import { CRUDBase, HttpException } from '../../../../utils'
import { ICampaignParticipants, ICampaignParticipantsCRUD } from '../interface'

class CampaignParticipantsCRUD
  extends CRUDBase<ICampaignParticipants>
  implements ICampaignParticipantsCRUD
{
  private static instance: ICampaignParticipantsCRUD | null = null

  private constructor(
    campaignParticipants: EntityTarget<ICampaignParticipants>
  ) {
    super(campaignParticipants)
  }

  static getInstance = (
    campaignParticipants: EntityTarget<ICampaignParticipants>
  ) => {
    if (CampaignParticipantsCRUD.instance === null)
      CampaignParticipantsCRUD.instance = new CampaignParticipantsCRUD(
        campaignParticipants
      )
    return CampaignParticipantsCRUD.instance
  }

  async insertMany(data: DeepPartial<ICampaignParticipants>[]): Promise<void> {
    try {
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(this.repository.target)
        .values(data)
        .orUpdate(['updatedAt'], ['id'])
        .setParameters(['updatedAt', new Date()])
        .execute()
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async updateMany(data: Partial<ICampaignParticipants>[]): Promise<void> {
    try {
      const promises: Promise<ICampaignParticipants>[] = []

      data.forEach((value) => {
        promises.push(this.update({ id: value.id }, value))
      })

      await Promise.all(promises)
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignParticipantsCRUD }
