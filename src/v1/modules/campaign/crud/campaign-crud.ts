// import { EntityTarget } from 'typeorm'
// import { CRUDBase } from '../../../../utils'
// import { ICampaign, ICampaignCRUD } from '../interface'
// import { Campaign } from '../models'

// class CampaignCRUD extends CRUDBase<ICampaign> implements ICampaignCRUD {
//   private static instance: ICampaignCRUD | null = null

//   private constructor(campaign: EntityTarget<ICampaign>) {
//     super(campaign)
//   }

//   static getInstance = (campaign: EntityTarget<ICampaign>) => {
//     if (CampaignCRUD.instance === null)
//       CampaignCRUD.instance = new CampaignCRUD(campaign)
//     return CampaignCRUD.instance
//   }
// }

// export { CampaignCRUD }
