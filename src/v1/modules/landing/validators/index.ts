import { JSONSchemaType } from 'ajv'
import { IContactUsForm } from '../interface'
import { Enum } from '../../../../constants'

const contactUsFormSchema: JSONSchemaType<IContactUsForm> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    followersCount: { type: 'string', nullable: true },
    profileLink: { type: 'string', nullable: true },
    mobileNo: { type: 'string', nullable: true },
    message: { type: 'string', nullable: true },
    personType: {
      type: 'string',
      enum: Object.values(Enum.PersonType),
    },
  },
  required: ['name', 'email', 'personType'],
  additionalProperties: false,
}

export { contactUsFormSchema }
