const addAgencyProfileSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', nullable: false },
    pocFirstName: { type: 'string', nullable: true },
    pocLastName: { type: 'string', nullable: false },
    mobileNo: { type: 'string', nullable: false },
    user: { type: 'string', nullable: false },
    websiteURL: { type: 'string', nullable: false },
  },
  required: ['pocFirstName', 'name', 'mobileNo', 'user', 'websiteURL'],
  additionalProperties: false,
}

const updateAgencyProfileSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', nullable: true },
    pocFirstName: { type: 'string', nullable: true },
    pocLastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: true },
    websiteURL: { type: 'string', nullable: true },
    profilePicURL: { type: 'string', nullable: true },
  },
  additionalProperties: false,
}

export { addAgencyProfileSchema, updateAgencyProfileSchema }
