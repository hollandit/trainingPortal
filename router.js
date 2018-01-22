const Router = require('koa-router'),
    passport = require('./bin/passport'),
    User = require('./model/user'),
    Test = require('./model/test'),
    router = new Router();

function rand_array(min, max, array) {
    let m = [];
    for (let i = min; i < max + 1; i++) {
        m.push(array[i]);
    }
    let res = [];
    let len = m.length;
    while (len) {
        let idx = Math.floor(Math.random() * len);
        res.push(m.splice(idx, 1)[0]);
        len--;
    }
    return res;
}

router
    .get('/', async ctx => {
       await ctx.render('index');
    })
    .post('/api/user', async ctx => {
        await passport.authenticate('local', async(err, user) => {
            if(user === false){
                ctx.body = false;
            } else {
                ctx.login(user, async (err) => {
                    await err ? ctx.body = err : ctx.body = user;
                });
            }
        })(ctx)
    });
// router
//     .get('/', async ctx => {
//         if(ctx.isAuthenticated()){
//             await ctx.redirect('/index');
//         }
//         await ctx.render('auth', {title: 'Авторизация'})
//     })
//     .get('/index', async ctx => {
//         if(!ctx.isAuthenticated()){
//             await ctx.redirect('/');
//         }
//         let user = ctx.state.user[0];
//         user.position = await User.position(user.position).then(position => {
//             return position;
//         });
//         let themes = await User.theme(user.id);
//         await ctx.render('home', {
//             title: 'Главная страница',
//             path: 'index',
//             userBy: user,
//             themes: themes,
//         });
//     })
//     .get('/training', async ctx => {
//         ctx.body = 'Training';
//     })
//     .get('/testing', async ctx => {
//         let user = ctx.state.user[0];
//         let themes = await User.theme(user.id);
//         await ctx.render('testing', {
//             title: 'Тестирование',
//             path: 'testing',
//             themes: themes
//         })
//     })
//     .get('/testing/:id', async ctx => {
//         await ctx.render('test', {
//             title: 'Текст',
//             path: 'test'
//         })
//         // await ctx.render('test', {
//         //     title: 'Тест',
//         //     path: 'test',
//         //     thema: theme[0],
//         //     test: rand_array(0, 2, test),
//         // })
//     })
//     .get('/api/test/:id', async(ctx) => {
//         let theme = await Test.theme(ctx.params.id);
//         let test = await Test.test(ctx.params.id);
//         let answearArr = await Promise.all(test.map(item => {
//             return Test.answear(item.id);
//         }));
//
//         for(let n=0; n<answearArr.length; n++){
//             test[n].answer = answearArr[n];
//         }
//
//         theme.test = rand_array(0,2,test);
//         ctx.body = theme;
//     })
//     .get('/logout', async ctx => {
//         if (ctx.isAuthenticated()) {
//             ctx.logout();
//             await ctx.redirect('/');
//         } else {
//             await ctx.redirect('/');
//         }
//     })
//     .post('/', async ctx => {
//         await passport.authenticate('local', async(err, user) => {
//             if(user === false){
//                 await ctx.render('auth', {title: 'Авторизация', message: 'Неверный логин или пароль'});
//             } else {
//                 ctx.login(user, async (err) => {
//                     await err ? ctx.body = err : ctx.redirect('/index');
//                 });
//             }
//         })(ctx)
//     });

module.exports = router;