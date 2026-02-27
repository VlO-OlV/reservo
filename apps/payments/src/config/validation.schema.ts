import * as Joi from 'joi';

export const validationSchema = Joi.object({
  STRIPE_SECRET_KEY: Joi.string().required(),
  PAYMENTS_GRPC_URL: Joi.string().required(),
  NOTIFICATIONS_GRPC_URL: Joi.string().required(),
});