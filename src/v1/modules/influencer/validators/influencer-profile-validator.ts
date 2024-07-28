const addInfluencerProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false, pattern: '^[1-9]\\d{1,14}$' },
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
    mobileNo: { type: 'string', nullable: true, pattern: '^[1-9]\\d{1,14}$' },
    twitterURL: { type: 'string', nullable: true },
    instagramURL: { type: 'string', nullable: true },
    youtubeURL: { type: 'string', nullable: true },
    linkedInURL: { type: 'string', nullable: true },
  },
  additionalProperties: false,
}

export { addInfluencerProfileSchema, updateInfluencerProfileSchema }
