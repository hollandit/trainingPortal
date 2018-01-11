const Router = require('koa-router'),
    passport = require('./bin/passport'),
    router = new Router();

router
    .get('/', async ctx => {
        await ctx.render('auth', {title: 'Авторизация'})
    })
    .get('/index', async ctx => {
        ctx.body = 'Success';
    })
    .get('/logout', async ctx => {
        if (ctx.isAuthenticated()) {
            ctx.logout();
            await ctx.redirect('/');
        } else {
            await ctx.redirect('/');
        }
    })
    .post('/', async ctx => {
        await passport.authenticate('local', async(err, user) => {
            if(user === false){
                await ctx.render('auth', {title: 'Авторизация', message: 'Неверный логин или пароль'});
            } else {
                ctx.login(user, async (err) => {
                    await err ? ctx.body = err : ctx.redirect('/index');
                });
            }
        })(ctx)
    });

module.exports = router;