import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_email')
  public async notifyEmail(
    @Payload() data: NotifyEmailDto,
  ) {
    this.notificationsService.notifyEmail(data);
  }
}
