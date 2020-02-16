module.exports = {
  jwtSecret: process.env.JWT_SECRET || "Is it secret, is it safe?",
  environment: process.env.NODE_ENV || "development"
};
