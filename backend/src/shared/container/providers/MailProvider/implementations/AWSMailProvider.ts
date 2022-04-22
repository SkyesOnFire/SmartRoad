import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: '',
      port: 465,
      secure: true,
      auth: {
        user: '',
        pass: '',
      },
    });

    this.client = transporter;
  }

  public async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const message = await this.client.sendMail({
      from: '',
      to,
      subject,
      text,
      html,
    });
  }
}

export default EtherealMailProvider;
