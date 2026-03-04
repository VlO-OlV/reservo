import * as Joi from 'joi';

export const validationSchema = Joi.object({
  GATEWAY_PORT: Joi.number().default(3004),
  RESERVATIONS_GRAPHQL_URL: Joi.string().required(),
  AUTH_GRPC_URL: Joi.string().required(),
  AUTH_GRAPHQL_URL: Joi.string().required(),
});