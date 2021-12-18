const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "root",
    password: env.DB_PASSWORD || "abc",
    database: env.DB_NAME || "final-project",
  },
};

module.exports = config;
