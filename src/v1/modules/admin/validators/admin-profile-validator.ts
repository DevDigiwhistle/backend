const addAdminProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false },
    userId: { type: 'string', nullable: false },
  },
  required: ['firstName', 'mobileNo', 'userId'],
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
