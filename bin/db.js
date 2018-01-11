const mysql = require('mysql'),
    config = require('./config');

const { user, password, database, host } = config.db;
let db = mysql.createPool({
    user: user,
    password: password,
    database: database,
    host: host,
});

db.getConnection((err, connection) => {
    if(err) console.error('Нет соединенение с бд. Возможно она отключена');
    if(connection) console.log('Соединение с бд включена');
});

module.exports = db;