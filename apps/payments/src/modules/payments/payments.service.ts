import { NOTIFICATIONS_SERVICE_NAME, NotificationsServiceClient } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private readonly stripe: Stripe;
  private notificationsService: NotificationsServiceClient;

  public constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('stripe.secretKey') as string,
      {
        apiVersion: '2025-12-15.clover'
      },
    );
  }

  onModuleInit() {
    this.notificationsService = this.client.getService<NotificationsServiceClient>(NOTIFICATIONS_SERVICE_NAME);
  }

  public async createCharge({ card, amount, email }: PaymentsCreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        ...card,
        exp_month: card.expMonth,
        exp_year: card.expYear,
      },
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    this.notificationsService
      .notifyEmail({ email, text: 'Reservation confirmed' })
      .subscribe(() => {});

    return paymentIntent;
  }
}
