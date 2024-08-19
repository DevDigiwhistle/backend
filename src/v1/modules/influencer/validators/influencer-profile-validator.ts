import { Enum } from '../../../../constants'

const addInfluencerProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false },
    user: { type: 'string', nullable: false },
    twitterURL: { type: 'string', nullable: true },
    instagramURL: { type: 'string', nullable: true },
    youtubeURL: { type: 'string', nullable: true },
    linkedInURL: { type: 'string', nullable: true },
  },
  required: ['firstName', 'mobileNo', 'user'],
  additionalProperties: false,
}

const updateInfluencerProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: true },
    twitterURL: { type: 'string', nullable: true },
    instagramURL: { type: 'string', nullable: true },
    youtubeURL: { type: 'string', nullable: true },
    linkedInURL: { type: 'string', nullable: true },
    exclusive: { type: 'boolean', nullable: true },
    hideFrom: {
      type: 'string',
      nullable: true,
      enum: [Enum.HideFrom.BRAND, Enum.HideFrom.Influencer],
    },
    pay: { type: 'number', nullable: true },
  },
  additionalProperties: false,
}

export { addInfluencerProfileSchema, updateInfluencerProfileSchema }
