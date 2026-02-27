import * as Joi from 'joi';

export const validationSchema = Joi.object({
  RESERVATIONS_PORT: Joi.number().default(3000),
  AUTH_GRPC_URL: Joi.string().required(),
  PAYMENTS_GRPC_URL: Joi.string().required(),
});