const addAdminProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false },
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
    mobileNo: { type: 'string', nullable: true },
  },
  additionalProperties: false,
}

export { addAdminProfileSchema, updateAdminProfileSchema }
