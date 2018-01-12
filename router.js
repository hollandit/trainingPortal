const Router = require('koa-router'),
    passport = require('./bin/passport'),
    User = require('./model/user'),
    router = new Router();

router
    .get('/', async ctx => {
        if(ctx.isAuthenticated()){
            await ctx.redirect('/index');
        }
        await ctx.render('auth', {title: 'Авторизация'})
    })
    .get('/index', async ctx => {
        if(!ctx.isAuthenticated()){
            await ctx.redirect('/');
        }
        let user = ctx.state.user[0];
        user.position = await User.position(user.position).then(position => {
            return position;
        });
        let themes = await User.theme(user.id).then(theme => {
            console.log(theme);
            return theme;
        });
        await ctx.render('index', {
            title: 'Главная страница',
            userBy: user,
            themes: themes,
        });
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