const passport = require('koa-passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    db = require('./db');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
   db.query('SELECT * FROM user WHERE id = ?',
       [id],
       (err, rows) => {
            done(err, rows);
       });
});

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    (login, password, done) => {
        let sql = 'SELECT * FROM user WHERE login = ?';
        db.query(sql, [login], (err, rows) => {
            if (err) return done(err);
            if(!rows.length) {
                return done(null, false);
            }
            bcrypt.compare(password, rows[0].password, (err, isMatch) => {
                if(err) return done(err);
                if(isMatch){
                    return done(null, rows[0]);
                } else {
                    return done(null, false);
                }
            });
        });
    }));

module.exports = passport;