const Koa = require('koa'),
    bodyParse = require('koa-body'),
    views = require('koa-views'),
    server = require('koa-static'),
    logger = require('koa-logger'),
    session = require('koa-session'),
    passport = require('./bin/passport'),
    router = require('./router'),
    app = new Koa();

app.keys = ['SecreT Keys'];
app.use(bodyParse());
app.use(session({}, app));
app.use(logger());
app.use(server(__dirname + '/public'));
app.use(views(__dirname + '/public', {extension: 'pug'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(router.routes());

module.exports = app;