export default () => ({
  redisUrl: process.env.REDIS_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  redisJwtExpiration: +process.env.REDIS_JWT_EXPIRATION_IN_SECONDS,
});
