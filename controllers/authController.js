const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require("passport");

const viewLogin = async (req, res) => {
    User.getPrincipal()
        .then(result => {
            if (result) {
                res.render('auth/login');
            } else {
                res.render('auth/adminSignup');
            }
        }).catch(console.log)
}

const authenticate = async (username, password, done) => {
    if (username === 'admin') {
        if (password === 'admin') {
            const user = { name: 'Admin', type: 'principal' }
            return done(null, user);
        } else {
            return done(null, false, { message: "Password is incorrect" });
        }
    } else {
        try {
            const user = await User.findByUsername(username);
            if (user) {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        //password is incorrect
                        return done(null, false, { message: "Password is incorrect" });
                    }
                });
            } else {
                // No user
                return done(null, false, {
                    message: "No user with that username"
                });
            }

        } catch (err) {
            return done(null, false, {
                message: "Login Error"
            });
        }
    }
}

const login = passport.authenticate("local", {
    successRedirect: "../dashboard",
    failureRedirect: "login",
    failureFlash: true
})

const logout = async (req, res) => {
    req.logout();
    req.flash("logoutMessage", "Logged out successfully!");
    res.redirect("/login");
}

const viewFaq = async (req, res) => {
    res.render('faq');
}

module.exports = {
    viewLogin,
    authenticate,
    login,
    logout,
    viewFaq,
}
