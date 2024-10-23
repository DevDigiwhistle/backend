export type PayrollWebhookPayload = {
  type: string
  payrollId: string
  payrollHistoryId: string
  presentSalaryMonth: number
  payrollDate: Date
  incentive: number
}
