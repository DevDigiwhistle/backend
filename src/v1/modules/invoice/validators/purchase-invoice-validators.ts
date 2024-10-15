import { Enum } from '../../../../constants'

export const addPurchaseInvoiceSchema = {
  type: 'object',
  properties: {
    campaign: { type: 'string', format: 'uuid', nullable: false },
    invoiceNo: { type: 'string', nullable: false },
    pan: { type: 'string', nullable: false },
    amount: { type: 'number', nullable: false },
    igst: { type: 'number', nullable: false },
    cgst: { type: 'number', nullable: false },
    sgst: { type: 'number', nullable: false },
    totalAmount: { type: 'number', nullable: false },
    tds: { type: 'number', nullable: false },
    finalAmount: { type: 'number', nullable: false },
    amountToBeReceived: { type: 'number', nullable: false },
    paymentTerms: {
      type: 'string',
      nullable: false,
      enum: Object.values(Enum.PaymentTerms),
    },
    paymentStatus: {
      type: 'string',
      enum: Object.values(Enum.InvoiceStatus),
      nullable: false,
    },
    file: { type: 'string', nullable: true },
    influencerProfile: { type: 'string', format: 'uuid', nullable: true },
    agencyProfile: { type: 'string', format: 'uuid', nullable: true },
    invoiceDate: { type: 'string', format: 'date-time', nullable: false },
  },
  required: [
    'campaign',
    'invoiceNo',
    'pan',
    'amount',
    'igst',
    'cgst',
    'sgst',
    'totalAmount',
    'tds',
    'finalAmount',
    'amountToBeReceived',
    'paymentTerms',
    'paymentStatus',
    'invoiceDate',
  ],
  additionalProperties: false,
}

export const updatePurchaseInvoiceSchema = {
  type: 'object',
  properties: {
    invoiceNo: { type: 'string', nullable: false },
    pan: { type: 'string', nullable: false },
    amount: { type: 'number', nullable: false },
    igst: { type: 'number', nullable: false },
    cgst: { type: 'number', nullable: false },
    sgst: { type: 'number', nullable: false },
    totalAmount: { type: 'number', nullable: false },
    tds: { type: 'number', nullable: false },
    tdsPercentage: { type: 'number', nullable: false },
    tdsSection: { type: 'string', nullable: false },
    finalAmount: { type: 'number', nullable: false },
    amountToBeReceived: { type: 'number', nullable: false },
    paymentTerms: {
      type: 'string',
      nullable: false,
      enum: Object.values(Enum.PaymentTerms),
    },
    paymentStatus: {
      type: 'string',
      enum: Object.values(Enum.InvoiceStatus),
      nullable: false,
    },
    file: { type: 'string', nullable: true },
  },
  required: [],
  additionalProperties: false,
}
