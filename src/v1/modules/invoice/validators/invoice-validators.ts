export const shareInvoiceSchema = {
  type: 'object',

  properties: {
    invoiceId: 'string',
    emails: {
      type: 'array',
      items: {
        type: 'string',
        format: 'email',
      },
      minItems: 1,
      uniqueItems: true,
    },
    subject: {
      type: 'string',
    },
    message: {
      type: 'string',
    },
  },
  required: ['emails', 'subject', 'message'],
  additionalProperties: false,
}
