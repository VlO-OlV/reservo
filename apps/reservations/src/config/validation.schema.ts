import * as Joi from 'joi';

export const validationSchema = Joi.object({
  RESERVATIONS_PORT: Joi.number().default(3000),
  AUTH_TCP_PORT: Joi.number().default(3002),
  AUTH_HOST: Joi.string().required(),
  PAYMENTS_TCP_PORT: Joi.number().default(3003),
  PAYMENTS_HOST: Joi.string().required(),
});