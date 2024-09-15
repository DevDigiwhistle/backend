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
    startDate: { type: 'string' },
    endDate: { type: 'string' },
    commercial: { type: 'number' },
    incentiveWinner: { type: 'string' },
    status: { type: 'string' },
    participants: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: { type: 'string', enum: ['influencer', 'agency'] },
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          exclusive: { type: 'boolean' },
          invoice: { type: ['string', 'null'] },
          commercialBrand: { type: ['number', 'null'] },
          commercialCreator: { type: ['number', 'null'] },
          toBeGiven: { type: ['number', 'null'] },
          margin: { type: ['number', 'null'] },
          paymentStatus: {
            type: 'string',
            enum: [...Object.values(Enum.CampaignPaymentStatus)],
          },
          invoiceStatus: {
            type: 'string',
            enum: [...Object.values(Enum.CampaignInvoiceStatus)],
          },
          deliverables: {
            type: ['array', 'null'],
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                title: { type: 'string' },
                platform: { type: 'string' },
                status: {
                  type: 'string',
                  enum: [...Object.values(Enum.CampaignDeliverableStatus)],
                },
                deliverableLink: { type: ['string', 'null'], format: 'uri' },
                er: { type: ['number', 'null'] },
                cpv: { type: ['number', 'null'] },
              },
            },
          },
          influencer: {
            type: ['array', 'null'],
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                id: { type: 'string', format: 'uuid' },
                deliverables: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      title: { type: 'string' },
                      platform: { type: 'string' },
                      status: {
                        type: 'string',
                        enum: [
                          ...Object.values(Enum.CampaignDeliverableStatus),
                        ],
                      },
                      deliverableLink: {
                        type: ['string', 'null'],
                        format: 'uri',
                      },
                      er: { type: ['number', 'null'] },
                      cpv: { type: ['number', 'null'] },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

export { addCampaignSchema, updateCampaignSchema, updateCampaignCardsSchema }
