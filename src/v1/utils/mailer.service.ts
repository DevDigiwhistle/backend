import nodemailer from 'nodemailer'
import { AppLogger } from '../../utils'

interface IMailerService {
  sendMail(
    to: string | string[],
    subject: string,
    message: string
  ): Promise<void>
}

class MailerService implements IMailerService {
  private static instance: IMailerService | null = null

  static getInstance() {
    if (MailerService.instance === null) {
      MailerService.instance = new MailerService()
    }
    return MailerService.instance
  }

  private constructor() {}

  async sendMail(to: string, subject: string, message: string): Promise<void> {
    try {
      const port: number = parseInt(process.env.MAIL_PORT as string) ?? 0
      const user: string = process.env.MAIL_USER ?? ''
      const pass: string = process.env.MAIL_PASS ?? ''
      const host: string = process.env.MAIL_HOST ?? ''

      const transporter: any = nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
          user,
          pass,
        },
      })

      const mailOptions = {
        from: `"digiwhistle" <${user}>`,
        to,
        subject,
        html: message,
      }

      await transporter.sendMail(mailOptions)
    } catch (e) {
      AppLogger.getInstance().error(`Error in mailer service: ${e}`)
    }
  }
}

export { IMailerService, MailerService }
