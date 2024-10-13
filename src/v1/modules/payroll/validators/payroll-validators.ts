import { Enum } from '../../../../constants'

export const addPayrollSchema = {
  type: 'object',
  properties: {
    employeeProfile: { type: 'string', format: 'uuid', nullable: false },
    basic: { type: 'number', nullable: false },
    hra: { type: 'number', nullable: false },
    others: { type: 'number', nullable: false },
    ctc: { type: 'number', nullable: false },
    EmploymentType: {
      type: 'string',
      enum: Object.values(Enum.EmploymentType),
      nullable: false,
    },
    salaryMonth: { type: 'number', nullable: false },
    tds: { type: 'number', nullable: false },
  },
  required: [
    'employeeProfile',
    'basic',
    'hra',
    'others',
    'ctc',
    'EmploymentType',
    'salaryMonth',
    'tds',
  ],
  additionalProperties: false,
}

export const updatePayrollSchema = {
  type: 'object',
  properties: {
    basic: { type: 'number', nullable: false },
    hra: { type: 'number', nullable: false },
    others: { type: 'number', nullable: false },
    ctc: { type: 'number', nullable: false },
    EmploymentType: {
      type: 'string',
      enum: Object.values(Enum.EmploymentType),
      nullable: false,
    },
    tds: { type: 'number', nullable: false },
  },
  additionalProperties: false,
}
