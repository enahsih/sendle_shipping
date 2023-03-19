const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Local user Model
const User = require('./Models/users.model');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'}, (email, password, done) => {
            //Match admin
            User.findOne({Email:email})
            .then(user =>{
                if(!user){
                    return done(null, false, {message: 'That email is not registered'});
                }
                //Match password
                bcrypt.compare(password, user.Password, (err, isMatch) =>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }
                    else{
                        return done(null, false, {message:'Password incorrect'})
                    }
                })
            })
            .catch(err => console.log(err))

        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    })
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        })
    })

};