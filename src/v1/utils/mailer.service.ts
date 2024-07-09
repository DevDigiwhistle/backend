import nodemailer from 'nodemailer'

interface IMailerService {
    sendMail(to: string,subject: string,message: string): Promise<void>
}

class MailerService implements IMailerService {
  async sendMail(to: string,subject: string,message: string): Promise<void> {
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
  }
}

export {
    IMailerService,
    MailerService
}