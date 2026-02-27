import * as Joi from 'joi';

export const validationSchema = Joi.object({
  AUTH_HTTP_PORT: Joi.number().default(3001),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().required(),
  AUTH_GRPC_URL: Joi.string().required(),
});