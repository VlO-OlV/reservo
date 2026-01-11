export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  }
});
