const db = require('../bin/db');

let Test = {
    test: function(id){
        return requestTest('SELECT * FROM questions WHERE id_theme = ?', id);
    },
    answear: function(id){
        return requestTest('SELECT * FROM answers WHERE id_question = ?', id);
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
    }).then(rows => {return rows;});
}

module.exports = Test;