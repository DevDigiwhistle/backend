const addEmployeeProfileSchema = {
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

const updateEmployeeProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false },
  },

  additionalProperties: false,
}

export { addEmployeeProfileSchema, updateEmployeeProfileSchema }
