import { DeepPartial, EntityTarget } from 'typeorm'
import { CRUDBase, HttpException } from '../../../../utils'
import { ICampaignDeliverables, ICampaignDeliverablesCRUD } from '../interface'

class CampaignDeliverablesCRUD
  extends CRUDBase<ICampaignDeliverables>
  implements ICampaignDeliverablesCRUD
{
  private static instance: ICampaignDeliverablesCRUD | null = null

  private constructor(
    campaignDeliverables: EntityTarget<ICampaignDeliverables>
  ) {
    super(campaignDeliverables)
  }

  static getInstance = (
    campaignDeliverables: EntityTarget<ICampaignDeliverables>
  ) => {
    if (CampaignDeliverablesCRUD.instance === null)
      CampaignDeliverablesCRUD.instance = new CampaignDeliverablesCRUD(
        campaignDeliverables
      )
    return CampaignDeliverablesCRUD.instance
  }

  async insertMany(data: DeepPartial<ICampaignDeliverables>[]): Promise<void> {
    try {
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(this.repository.target)
        .values(data)
        .orUpdate(['updatedAt'], ['id'])
        .setParameter('updatedAt', new Date())
        .execute()
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

export { CampaignDeliverablesCRUD }
