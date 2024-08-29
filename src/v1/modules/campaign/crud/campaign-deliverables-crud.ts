// import { EntityTarget } from 'typeorm'
// import { CRUDBase } from '../../../../utils'
// import { ICampaignDeliverables, ICampaignDeliverablesCRUD } from '../interface'
// import { CampaignDeliverables } from '../models'

// class CampaignDeliverablesCRUD
//   extends CRUDBase<ICampaignDeliverables>
//   implements ICampaignDeliverablesCRUD
// {
//   private static instance: ICampaignDeliverablesCRUD | null = null

//   private constructor(
//     campaignDeliverables: EntityTarget<ICampaignDeliverables>
//   ) {
//     super(campaignDeliverables)
//   }

//   static getInstance = (
//     campaignDeliverables: EntityTarget<ICampaignDeliverables>
//   ) => {
//     if (CampaignDeliverablesCRUD.instance === null)
//       CampaignDeliverablesCRUD.instance = new CampaignDeliverablesCRUD(
//         campaignDeliverables
//       )
//     return CampaignDeliverablesCRUD.instance
//   }
// }

// export { CampaignDeliverablesCRUD }
