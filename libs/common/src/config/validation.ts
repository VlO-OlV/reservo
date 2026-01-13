import * as Joi from 'joi';

export const validationSchema = Joi.object({
  RESERVATIONS_PORT: Joi.number().default(3000),
  AUTH_HTTP_PORT: Joi.number().default(3001),
  AUTH_TCP_PORT: Joi.number().default(3002),
  AUTH_HOST: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().required(),
});