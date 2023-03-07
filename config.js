const { NODE_ENV = 'develop', JWT_SECRET = 'dev-some-secret-key', PORT = 3000 } = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, PORT,
};
