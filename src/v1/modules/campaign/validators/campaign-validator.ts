import { Enum } from '../../../../constants'

const addCampaignSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    code: { type: 'string' },
    brandName: { type: 'string' },
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

export { addCampaignSchema, updateCampaignSchema }
