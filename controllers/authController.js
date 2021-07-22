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

const registerPrincipal = async (req, res) => {
    const { name, address, mobile_number: mobile, nic: NIC, username, password, cPassword } = req.body;
    if (password === cPassword) {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.createUser(name, address, mobile, NIC, username, hashedPassword, 'principal')
            .then(data => {
                res.redirect('/login')
            })
            .catch(console.log)
    } else {
        req.flash("adminRegister", "Password mismatch!");
        console.log('Mismatch')
        res.redirect('/login')
    }
}

module.exports = {
    viewLogin,
    authenticate,
    login,
    logout,
    viewFaq,
    registerPrincipal
}
