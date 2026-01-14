import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe: Stripe;

  public constructor(
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      configService.get<string>('stripe.secretKey') as string,
      {
        apiVersion: '2025-12-15.clover'
      },
    );
  }

  public async createCharge({ card, amount }: CreateChargeDto) {
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

    return paymentIntent;
  }
}
