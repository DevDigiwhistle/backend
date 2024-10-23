import { Request, Response } from 'express'
import { IRazorpayService } from '../utils/razorpay-service'
import { errorHandler } from '../../utils'
import { responseHandler } from '../../utils/response-handler'

export class RazorpayController {
  private readonly razorpayService: IRazorpayService

  constructor(razorpayService: IRazorpayService) {
    this.razorpayService = razorpayService
  }

  async webhook(req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body)
      console.log(req.headers)

      await this.razorpayService.verifyWebhook(
        req.body,
        req.headers['x-razorpay-signature'] as string
      )
      return responseHandler(200, res, 'Webhook Received Successfully', {}, req)
    } catch (e) {
      return errorHandler(e, res, req)
    }
  }
}
