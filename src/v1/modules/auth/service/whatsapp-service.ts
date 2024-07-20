import { HttpException } from '../../../../utils'
import { IAxiosService } from '../../../utils'
import querystring from 'querystring'
import { IWhatsappService } from '../interface'

class WhatsappService implements IWhatsappService {
  private static instance: IWhatsappService | null = null
  private readonly axiosService: IAxiosService

  static getInstance(axiosService: IAxiosService) {
    if (WhatsappService.instance === null) {
      WhatsappService.instance = new WhatsappService(axiosService)
    }
    return WhatsappService.instance
  }

  private constructor(axiosService: IAxiosService) {
    this.axiosService = axiosService
  }

  async sendMessage(
    destination: string | string[],
    message: string
  ): Promise<void> {
    try {
      const formData = querystring.stringify({
        channel: 'whatsapp',
        source: process.env.WHATSAPP_SOURCE_NUMBER,
        destination: destination,
        message: JSON.stringify({
          type: 'text',
          text: message,
        }),
        'src.name': 'Digiwhistle',
      })

      await this.axiosService.post(`${process.env.GUPSHUP_API}`, formData, {
        'Content-Type': 'application/x-www-form-urlencoded',
        apikey: `${process.env.GUPSHUP_API_KEY}`,
      })
    } catch (e) {
      console.log('error in whatsapp service: ', e)
    }
  }
}

export { WhatsappService }
