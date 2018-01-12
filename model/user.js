let db = require('../bin/db');
global.Promise = require('bluebird');

let User = {
    theme: function(id){
        return requestUser('SELECT name, id_theme FROM access, thema WHERE access.id_user = ? AND access.id_theme=thema.id', id);
    },
    position: function(id){
        return requestUser('SELECT name FROM position WHERE id = ?', id);
    }
};

function requestUser(sql, req){
    return new Promise((resolve, reject) => {
        db.query(
            sql,
            [req],
            (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            });
    });
}

module.exports = User;