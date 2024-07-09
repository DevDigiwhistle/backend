const authSchema = {
  type: 'object',
  properties: {
    idToken: {
      type: 'string',
    },
  },
  required: ['idToken'],
  additionalProperties: false,
}

const resetPasswordEmailSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['email'],
  additionalProperties: false,
}

const resetPasswordSchema = {
  type: 'object',
  properties: {
    oobCode: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['oobCode', 'password'],
  additionalProperties: false,
}

export{
    resetPasswordEmailSchema,
    resetPasswordSchema,
    authSchema
}