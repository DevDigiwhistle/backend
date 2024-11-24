import { HttpException } from '../../utils'
import { IAxiosService } from './axios-service'
import fs from 'fs'

export interface IEAgreementService {
  sendTemplateForSigning(templateId: string, body: any): Promise<string>
  getDocumentPdf(documentId: string): Promise<string>
}

export class EAgreementService implements IEAgreementService {
  private static instance: IEAgreementService | null = null
  private readonly axiosService: IAxiosService
  private readonly refreshToken = process.env.ZOHO_REFRESH_TOKEN
  private readonly clientSecret = process.env.ZOHO_CLIENT_SECRET
  private readonly clientId = process.env.ZOHO_CLIENT_ID

  static getInstance = (axiosService: IAxiosService) => {
    if (EAgreementService.instance === null)
      EAgreementService.instance = new EAgreementService(axiosService)
    return EAgreementService.instance
  }

  private constructor(axiosService: IAxiosService) {
    this.axiosService = axiosService
  }

  private async generateAccessToken(): Promise<string> {
    try {
      const response = await this.axiosService.post(
        `https://accounts.zoho.in/oauth/v2/token?refresh_token=${this.refreshToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}&redirect_uri=https%3A%2F%2Fsign.zoho.com&grant_type=refresh_token`,
        {}
      )

      return response.data.access_token
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async sendTemplateForSigning(templateId: string, body: any): Promise<string> {
    try {
      const token = await this.generateAccessToken()

      const response = await this.axiosService.post(
        `https://sign.zoho.com/api/v1/templates/${templateId}/createdocument`,
        body,
        {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      )

      const documentId = response.data?.requests?.request_id

      return documentId
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }

  async getDocumentPdf(documentId: string): Promise<string> {
    try {
      const token = await this.generateAccessToken()

      const response = await this.axiosService.get(
        `https://sign.zoho.com/api/v1/requests/${documentId}/pdf`,
        {
          Authorization: `Zoho-oauthtoken ${token}`,
        }
      )

      // Save the PDF response to a file
      const filePath = `./reports/${documentId}.pdf`
      fs.writeFileSync(filePath, response?.data, { encoding: 'binary' })

      return filePath
    } catch (e) {
      throw new HttpException(e?.errorCode, e?.message)
    }
  }
}

//   77631000000035315

// private getTemplateDataForInfluencerAgreement() {
//   return {
//     data: {
//       templates: {
//         field_data: {
//           field_text_data: {},
//           field_boolean_data: {},
//           field_date_data: {},
//         },
//         actions: [
//           {
//             action_id: '2000000468052',
//             action_type: 'SIGN',
//             recipient_name: '',
//             role: 'ts1',
//             recipient_email: 's********@***.com',
//             recipient_phonenumber: '',
//             recipient_countrycode: '',
//             private_notes: '',
//             verify_recipient: true,
//             verification_type: 'EMAIL',
//           },
//         ],
//         notes: '',
//       },
//     },
//     is_quicksend: true,
//   }
// }
