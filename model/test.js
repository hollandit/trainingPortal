const db = require('../bin/db');

let Test = {
    allThemes: function(){
        return requestAll('SELECT id, name FROM thema');
    },
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

function requestTest(sql, req = null) {
    return new Promise((resolve, reject) => {
        db.query(
            sql,
            !req ? '': [req],
            (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            });
    });
}

function requestAll(sql) {
    return new Promise((resolve, reject) => {
        db.query(
            sql,
            (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            });
    });
}

module.exports = Test;