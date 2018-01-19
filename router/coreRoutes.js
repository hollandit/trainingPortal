const Router = require('koa-router'),
    router = new Router(),
    React = require('react'),
    ReactDOMServer = require('react-dom/server');

router.get('/', async(ctx) => {
    let reactHtml = ReactDOMServer.renderToString();
    await ctx.render('index');
})