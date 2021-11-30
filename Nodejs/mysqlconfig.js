const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "antoine",
    password: env.DB_PASSWORD || "Antoinedebes123",
    database: env.DB_NAME || "final-project",
  },
};

module.exports = config;
