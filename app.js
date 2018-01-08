const Koa = require('koa'),
    bodyParse = require('koa-body'),
    views = require('koa-views'),
    server = require('koa-static'),
    logger = require('koa-logger'),
    session = require('koa-session'),
    router = require('./router'),
    app = new Koa();

app.use(bodyParse());
app.use(session({}, app));
app.use(logger());
app.use(server(__dirname + '/public'));
app.use(views(__dirname + '/public', {extension: 'pug'}));


app.use(router.routes());

module.exports = app;