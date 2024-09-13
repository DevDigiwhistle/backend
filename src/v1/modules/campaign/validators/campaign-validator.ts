import { Enum } from '../../../../constants'

const addCampaignSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    code: { type: 'string' },
    brandName: { type: 'string' },
    brand: { type: 'string' },
    startDate: { type: 'string', format: 'date-time' },
    endDate: { type: 'string', format: 'date-time' },
    commercial: { type: 'number' },
    platform: {
      type: 'array',
      items: { type: 'string', enum: [...Object.values(Enum.Platform)] },
    },
    details: { type: ['string', 'null'] },
    manager: { type: 'string' },
    incentiveWinner: {
      oneOf: [{ type: 'string' }, { type: 'null' }],
    },
    participants: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          roleId: { type: 'number' },
          profileId: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['roleId', 'profileId', 'email', 'id'],
      },
    },
  },
  required: [
    'name',
    'code',
    'brandName',
    'brand',
    'startDate',
    'endDate',
    'commercial',
    'platform',
    'manager',
    'participants',
  ],
  additionalProperties: false,
}

const updateCampaignSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    code: { type: 'string' },
    brandName: { type: 'string' },
    brand: { type: 'string' },
    startDate: { type: 'string', format: 'date-time' },
    endDate: { type: 'string', format: 'date-time' },
    commercial: { type: 'number' },
    platform: {
      type: 'array',
      items: { type: 'string', enum: [...Object.values(Enum.Platform)] },
    },
    details: { type: ['string', 'null'] },
    invoiceNo: { type: ['string', 'null'] },
    status: { type: 'string', enum: [...Object.values(Enum.CampaignStatus)] },
    manager: { type: 'string' },
    incentiveWinner: {
      oneOf: [{ type: 'string' }, { type: 'null' }],
    },
    participants: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          roleId: { type: 'number' },
          profileId: { type: 'string' },
          email: { type: 'string' },
          id: { type: 'string' },
        },
        required: ['roleId', 'profileId', 'email', 'id'],
      },
    },
  },
  additionalProperties: false,
}

const updateCampaignCardsSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    code: { type: 'string' },
    brandName: { type: 'string' },
    brand: { type: 'string' },
    startDate: { type: 'string', format: 'date-time' },
    endDate: { type: 'string', format: 'date-time' },
    commercial: { type: 'number' },
    incentiveWinner: { type: 'string' },
    status: { type: 'string' },
    participants: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'object',
            properties: {
              id: { type: 'string' },
              type: { type: 'string' },
              name: { type: 'string' },
              exclusive: { type: 'boolean' },
              commercialBrand: { type: 'number' },
              commercialCreator: { type: 'number' },
              toBeGiven: { type: 'number' },
              margin: { type: 'number' },
              paymentStatus: {
                type: 'string',
                enum: Object.values(Enum.CampaignPaymentStatus),
              },
              invoiceStatus: {
                type: 'string',
                enum: Object.values(Enum.CampaignInvoiceStatus),
              },
              deliverables: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    platform: {
                      type: 'string',
                      enum: Object.values(Enum.Platform),
                    },
                    campaignStatus: {
                      type: 'string',
                      enum: Object.values(Enum.CampaignDeliverableStatus),
                    },
                    deliverableLink: { type: 'string' },
                    er: { type: ['number', 'null'] },
                    cpv: { type: ['number', 'null'] },
                  },
                  required: [
                    'id',
                    'title',
                    'platform',
                    'campaignStatus',
                    'deliverableLink',
                  ],
                },
              },
            },
            required: [
              'id',
              'type',
              'name',
              'commercialBrand',
              'commercialCreator',
              'toBeGiven',
              'margin',
              'paymentStatus',
              'invoiceStatus',
              'deliverables',
            ],
          },
          {
            type: 'object',
            properties: {
              id: { type: 'string' },
              type: { type: 'string' },
              name: { type: 'string' },
              commercialBrand: { type: 'number' },
              commercialCreator: { type: 'number' },
              toBeGiven: { type: 'number' },
              margin: { type: 'number' },
              paymentStatus: {
                type: 'string',
                enum: Object.values(Enum.CampaignPaymentStatus),
              },
              invoiceStatus: {
                type: 'string',
                enum: Object.values(Enum.CampaignInvoiceStatus),
              },
              influencer: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    deliverables: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          title: { type: 'string' },
                          platform: {
                            type: 'string',
                            enum: Object.values(Enum.Platform),
                          },
                          campaignStatus: {
                            type: 'string',
                            enum: Object.values(Enum.CampaignDeliverableStatus),
                          },
                          deliverableLink: { type: 'string' },
                          er: { type: ['number', 'null'] },
                          cpv: { type: ['number', 'null'] },
                        },
                        required: [
                          'id',
                          'title',
                          'platform',
                          'campaignStatus',
                          'deliverableLink',
                        ],
                      },
                    },
                  },
                  required: ['name', 'deliverables'],
                },
              },
            },
            required: [
              'id',
              'type',
              'name',
              'commercialBrand',
              'commercialCreator',
              'toBeGiven',
              'margin',
              'paymentStatus',
              'invoiceStatus',
              'influencer',
            ],
          },
        ],
      },
    },
  },
  required: [
    'id',
    'name',
    'code',
    'brandName',
    'brand',
    'startDate',
    'endDate',
    'commercial',
    'incentiveWinner',
    'status',
    'participants',
  ],
}

export { addCampaignSchema, updateCampaignSchema, updateCampaignCardsSchema }
