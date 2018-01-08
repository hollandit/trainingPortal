const Router = require('koa-router'),
    router = new Router();

router
    .get('/', async ctx => {
        await ctx.render('auth', {title: 'Авторизация'})
    });

module.exports = router;