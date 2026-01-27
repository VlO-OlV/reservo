import * as Joi from 'joi';

export const validationSchema = Joi.object({
  RESERVATIONS_PORT: Joi.number().default(3000),
  AUTH_HTTP_PORT: Joi.number().default(3001),
  AUTH_TCP_PORT: Joi.number().default(3002),
  AUTH_HOST: Joi.string().required(),
  PAYMENTS_TCP_PORT: Joi.number().default(3003),
  PAYMENTS_HOST: Joi.string().required(),
  NOTIFICATIONS_TCP_PORT: Joi.number().default(3004),
  NOTIFICATIONS_HOST: Joi.string().required(),
  DB_URL: Joi.string().required(),
  DB_HOST: Joi.string().optional(),
  DB_USER: Joi.string().optional(),
  DB_PASSWORD: Joi.string().optional(),
  DB_NAME: Joi.string().optional(),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  SMTP_USER: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_REFRESH: Joi.string().required(),
});