const db = require('../bin/db');

let Test = {
    test: function(id){
        return requestTest('SELECT * FROM questions WHERE id_theme = ?', id);
    },
    answear: function(id){
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM answers WHERE id_question IN (?)`,
                id,
                (err, rows) => {
                    if(err) reject(err);
                    resolve(rows);
                });
        }).then(rows => {return rows;});
    },
    theme: function(id){
        return requestTest('SELECT name FROM thema WHERE id = ?', id);
    }
};

function requestTest(sql, req) {
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

module.exports = Test;