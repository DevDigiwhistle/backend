const addAdminProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false, pattern: '^[1-9]\\d{1,14}$' },
    user: { type: 'string', nullable: false },
  },
  required: ['firstName', 'mobileNo', 'user'],
  additionalProperties: false,
}

const updateAdminProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: true },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: true, pattern: '^[1-9]\\d{1,14}$' },
  },
  additionalProperties: false,
}

export { addAdminProfileSchema, updateAdminProfileSchema }
