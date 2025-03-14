const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/main',
    createProxyMiddleware({
      target: 'http://3.39.173.116:8080',	
      changeOrigin: true,
    })
  );
};