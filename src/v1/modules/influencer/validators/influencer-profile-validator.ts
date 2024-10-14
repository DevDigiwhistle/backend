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
      enum: [Enum.HideFrom.BRAND, Enum.HideFrom.AGENCY],
    },
    pay: { type: 'number', nullable: true },
    aadharNo: { type: 'string', nullable: true },
    panNo: { type: 'string', nullable: true },
    gstNo: { type: 'string', nullable: true },
    msmeNo: { type: 'string', nullable: true },
    bankName: { type: 'string', nullable: true },
    bankAccountNumber: { type: 'string', nullable: true },
    bankIfscCode: { type: 'string', nullable: true },
    bankAccountHolderName: { type: 'string', nullable: true },
    address: { type: 'string', nullable: true },
    city: { type: 'string', nullable: true },
    state: { type: 'string', nullable: true },
    pincode: { type: 'string', nullable: true },
  },
  additionalProperties: false,
}

export { addInfluencerProfileSchema, updateInfluencerProfileSchema }
