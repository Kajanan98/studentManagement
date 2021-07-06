const LocalStrategy = require("passport-local").Strategy;
const authController = require('../controllers/authController');
const User = require('../models/User');


function initialize(passport) {
    console.log("Passport initialized");

    const authenticateUser = async (username, password, done) => {
        await authController.authenticate(username, password, done);
    };

    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            authenticateUser
        )
    );
    // Stores user details inside session. serializeUser determines which data of the user
    // object should be stored in the session. The result of the serializeUser method is attached
    // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
    //   the user id as the key) req.session.passport.user = {id: 'xyz'}
    passport.serializeUser((user, done) => done(null, user._id));

    // In deserializeUser that key is matched with the in memory array / database or any data resource.
    // The fetched object is attached to the request object as req.user

    passport.deserializeUser(async (id, done) => {
        const user = await User.getUserByID(id);
        return done(null, user);
    })
}

module.exports = initialize;