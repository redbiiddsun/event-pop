export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    salt_rounds: parseInt(process.env.SALT_ROUNDS, 10),
    jwt_secret: process.env.JWT_SECRET,
  });