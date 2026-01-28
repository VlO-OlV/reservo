import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NOTIFICATIONS_TCP_PORT: Joi.number().default(3004),
  SMTP_USER: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_REFRESH: Joi.string().required(),
});