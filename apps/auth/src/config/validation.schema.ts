import * as Joi from 'joi';

export const validationSchema = Joi.object({
  AUTH_HTTP_PORT: Joi.number().default(3001),
  AUTH_TCP_PORT: Joi.number().default(3002),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().required(),
});