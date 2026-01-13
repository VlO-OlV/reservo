export default () => ({
  reservationsPort: parseInt(process.env.RESERVATIONS_PORT as string, 10) || 3000,
  auth: {
    host: process.env.AUTH_HOST,
    httpPort: parseInt(process.env.AUTH_HTTP_PORT as string, 10) || 3001,
    tcpPort: parseInt(process.env.AUTH_TCP_PORT as string, 10) || 3002,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: process.env.JWT_TTL,
  },
});
