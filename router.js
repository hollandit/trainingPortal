const Router = require('koa-router'),
    passport = require('./bin/passport'),
    User = require('./model/user'),
    Test = require('./model/test'),
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
        let themes = await User.theme(user.id);
        await ctx.render('index', {
            title: 'Главная страница',
            path: 'index',
            userBy: user,
            themes: themes,
        });
    })
    .get('/training', async ctx => {
        ctx.body = 'Training';
    })
    .get('/testing', async ctx => {
        let user = ctx.state.user[0];
        let themes = await User.theme(user.id);
        await ctx.render('testing', {
            title: 'Тестирование',
            path: 'testing',
            themes: themes
        })
    })
    .get('/testing/:id', async ctx => {
        // let answearArr = [];
        // let answerCorrectArr = [];
        let theme = await Test.theme(ctx.params.id);
        let test = await Test.test(ctx.params.id);
        let answearArr = await Promise.all(test.map(item => {
            console.log(item.name);
            return item.id
        })).then(id => id);
        console.log(answearArr);
        // for(i=0; i < test.length; i++){
        //     let answear = test[i].id;
        //     answearArr.push(await Test.answear(answear));
        // }
        // for(i=0; i < answearArr.length; i++){
        //     let arr = answearArr[i];
        //     for(n=0; n < arr.length; n++){
        //         let arr1 = arr[n];
        //         if(arr1.answer === 1){
        //             answerCorrectArr.push(arr1.id);
        //         }
        //     }
        // }
        // console.log(answerCorrectArr);
        await ctx.render('test', {
            title: 'Тест',
            path: 'test',
            // thema: theme[0],
            // test: test,
            // answear: answearArr,
        })
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