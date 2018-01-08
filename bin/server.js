const app = require('../app'),
    config = require('./config');

const PORT = process.env.PORT || config.port;

app.listen(PORT, err => {
    err ? console.log(err) : console.log(`Слушает порт ${PORT}`);
});