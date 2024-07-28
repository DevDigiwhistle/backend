const addBrandProfileSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', nullable: false },
    pocFirstName: { type: 'string', nullable: true },
    pocLastName: { type: 'string', nullable: false },
    mobileNo: { type: 'string', nullable: false, pattern: '^[1-9]\\d{1,14}$' },
    user: { type: 'string', nullable: false },
    websiteURL: { type: 'string', nullable: false },
  },
  required: ['pocFirstName', 'name', 'mobileNo', 'user', 'websiteURL'],
  additionalProperties: false,
}

const updateBrandProfileSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', nullable: true },
    pocFirstName: { type: 'string', nullable: true },
    pocLastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: true, pattern: '^[1-9]\\d{1,14}$' },
    websiteURL: { type: 'string', nullable: true },
  },
  additionalProperties: false,
}

export { addBrandProfileSchema, updateBrandProfileSchema }
