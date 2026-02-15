import * as Joi from 'joi';

export const validationSchema = Joi.object({
  STRIPE_SECRET_KEY: Joi.string().required(),
  RABBITMQ_URL: Joi.string().required(),
});