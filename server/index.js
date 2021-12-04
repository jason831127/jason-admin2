global.logger = require('tracer').colorConsole();
const Koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const bodyParser = require('koa-body');
// const rp = require('request-promise');
const path = require('path');
const cors = require('koa2-cors');
const os = require('os');
//because of the exam, use local config to replace remoteConfig
const serverConfig = require(path.join(os.homedir(), './config/config.json'));

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(app.env === 'production');

//local 端啟用 https
const http = require('http');
const https = require('https');
const fs = require('fs');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    portHttp = process.env.PORT_HTTP || 8080,
    portHttps = process.env.PORT_HTTPS || 8081,
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // if(phase != 'dev' && phase != 'production'){
  if (!process.env.DISABLE_BUILD_IN_HTTPS) {
    const { default: enforceHttps } = require('koa-sslify');
    app.use(
      enforceHttps({
        port: portHttps,
      })
    );
  }

  let domain = 'https:/pasadminjason.sayyogames.com/:8081';

  let fqdn = `${domain}/local_proxy`;

  app.context.globalParams = {
    fqdn: fqdn,
    googleOauth: serverConfig.googleOauth,
  };

  //處理跨域請求
  app.use(
    cors({
      origin: function (ctx) {
        if (ctx.url === '/test') {
          return false;
        }
        return '*';
      },
      exposeHeaders: [ 'WWW-Authenticate', 'Server-Authorization' ],
      maxAge: 5,
      credentials: true,
      allowMethods: [ 'GET', 'POST', 'DELETE', 'OPTIONS', 'PUT', 'HEAD' ],
      allowHeaders: [ 'Content-Type', 'Authorization', 'Accept', 'hugaToken' ],
    })
  );

  app.use(
    bodyParser({
      jsonLimit: '100mb',
      formLimit: '100mb',
      multipart: true,
      formidable: {
        keepExtensions: true, // 保持文件的后缀
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      },
    })
  );
  //EB 監聽 ok
  router.get('/ok', async function (ctx) {
    ctx.body = 'ok';
  });


  app.use(router.allowedMethods());

  app.use(router.routes());

  app.use((ctx) => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.session = ctx.session;
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  let str = '';
  // SSL options
  const options = {
    key: fs.readFileSync(path.join(os.homedir(), 'sayyogames.key')),
    cert: fs.readFileSync(path.join(os.homedir(), 'gd_sayyogames_crt.crt')),
    ca: fs.readFileSync(path.join(os.homedir(), 'gd_sayyogames_ca.crt')),
  };
  // start the server
  http.createServer(app.callback()).listen(portHttp);
  https.createServer(options, app.callback()).listen(portHttps);
  str = portHttps;

  consola.ready({
    message: `Server listening on http://${host}:${str} | Domain is ${domain}`,
    badge: true,
  });
}



start();
