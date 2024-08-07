const addEmployeeProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false },
    user: { type: 'string', nullable: false },
    profilePic: { type: 'string', nullable: true },
    designation: { type: 'string', nullable: false },
  },
  required: ['firstName', 'mobileNo', 'user', 'designation'],
  additionalProperties: false,
}

const updateEmployeeProfileSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', nullable: false },
    lastName: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: false },
    profilePic: { type: 'string', nullable: true },
    designation: { type: 'string', nullable: false },
  },

  additionalProperties: false,
}

export { addEmployeeProfileSchema, updateEmployeeProfileSchema }
