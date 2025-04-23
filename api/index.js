// api/index.js
const app = require('../app');

module.exports = (req, res) => {
  return app(req, res); // 直接将 express 实例作为 handler 暴露
};
