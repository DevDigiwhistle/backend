const addInfluencerSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    mobileNo: { type: 'string' },
    email: { type: 'string', format: 'email' },
    twitterURL: { type: 'string', format: 'uri', nullable: true },
    youtubeURL: { type: 'string', format: 'uri', nullable: true },
    instagramURL: { type: 'string', format: 'uri', nullable: true },
    linkedInURL: { type: 'string', format: 'uri', nullable: true },
  },
  required: ['firstName', 'lastName', 'mobileNo', 'email'],
  additionalProperties: false,
}

const inviteInfluencerSchema = {
  type: 'object',
  properties: {
    emails: {
      type: 'array',
      items: {
        type: 'string',
        format: 'email',
      },
      minItems: 1,
    },
    message: { type: 'string' },
    subject: { type: 'string' },
  },
  required: ['emails', 'message', 'subject'],
  additionalProperties: false,
}

export { inviteInfluencerSchema, addInfluencerSchema }
