import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PAYMENTS_TCP_PORT: Joi.number().default(3003),
  NOTIFICATIONS_TCP_PORT: Joi.number().default(3004),
  NOTIFICATIONS_HOST: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
});