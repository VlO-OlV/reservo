import * as Joi from 'joi';

export const validationSchema = Joi.object({
  SMTP_USER: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CLIENT_REFRESH: Joi.string().required(),
  RABBITMQ_URL: Joi.string().required(),
});