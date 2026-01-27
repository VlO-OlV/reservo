export default () => ({
  reservationsPort: parseInt(process.env.RESERVATIONS_PORT as string, 10) || 3000,
  auth: {
    host: process.env.AUTH_HOST,
    httpPort: parseInt(process.env.AUTH_HTTP_PORT as string, 10) || 3001,
    tcpPort: parseInt(process.env.AUTH_TCP_PORT as string, 10) || 3002,
  },
  payments: {
    host: process.env.PAYMENTS_HOST,
    tcpPort: process.env.PAYMENTS_TCP_PORT,
  },
  notifications: {
    host: process.env.NOTIFICATIONS_HOST,
    tcpPort: process.env.NOTIFICATIONS_TCP_PORT,
  },
  database: {
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_TTL,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  google: {
    smtpUser: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientRefresh: process.env.GOOGLE_CLIENT_REFRESH,
  },
});
