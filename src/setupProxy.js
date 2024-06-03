// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   //app.use는 미들웨어를 사용할때, 사용한다
//   // '/api'로  요청이 오면, proxy미들웨어를 실행해라.
//   app.use(
//     '/api/v1', //api : 아래의 target

//     createProxyMiddleware({
//       //스프링부트 포트가 8080이니까 여기 바꿈. 노드는 5000번
//       target: 'http://34.64.39.102:8080',
//       changeOrigin: true,
//     }),
//   );
// };
