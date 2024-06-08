// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Match all requests starting with /api
    createProxyMiddleware({
      target: 'http://localhost:8000', // Backend server URL
      changeOrigin: true,
    })
  );
};

module.exports = function(app) {
    app.use(
      '/auth', // Match all requests starting with /auth
      createProxyMiddleware({
        target: 'http://localhost:8000', // Backend server URL
        changeOrigin: true,
      })
    );
  };