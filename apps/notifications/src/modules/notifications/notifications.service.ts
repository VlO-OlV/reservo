import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly transporter: Transporter;

  public constructor(
    private readonly configService: ConfigService,
  ) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('google.smtpUser'),
        clientId: this.configService.get<string>('google.clientId'),
        clientSecret: this.configService.get<string>('google.clientSecret'),
        refreshToken: this.configService.get<string>('google.clientRefresh'),
      },
    });
  }

  public async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get<string>('google.smtpUser'),
      to: email,
      subject: 'Reservo notification',
      text,
    });
  }
}
