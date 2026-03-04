export default () => ({
  reservations: {
    httpPort: parseInt(process.env.RESERVATIONS_PORT as string, 10) || 3000,
    graphQlUrl: process.env.RESERVATIONS_GRAPHQL_URL,
  },
  auth: {
    httpPort: parseInt(process.env.AUTH_HTTP_PORT as string, 10) || 3001,
    grpcUrl: process.env.AUTH_GRPC_URL,
    graphQlUrl: process.env.AUTH_GRAPHQL_URL,
  },
  payments: {
    grpcUrl: process.env.PAYMENTS_GRPC_URL,
  },
  notifications: {
    grpcUrl: process.env.NOTIFICATIONS_GRPC_URL,
  },
  gateway: {
    httpPort: parseInt(process.env.GATEWAY_PORT as string, 10) || 3004,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
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
