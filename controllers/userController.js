const User = require("../models/User");
const bcrypt = require("bcrypt");

// Registration Page
exports.registerPage = (req, res) => {
    res.render("register");
};

// Register User
exports.registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        console.log("Received Data:", req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        console.log("User Saved Successfully");

        res.redirect("/login");

    } catch (err) {

        console.log("Registration Error:");
        console.log(err);

        res.send(err.message);

    }

};

// Login Page
exports.loginPage = (req, res) => {
    res.render("login");
};

// Login User
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.send("Incorrect Password");
        }

        // Save only required information in session
        req.session.user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };

        res.redirect("/");

    } catch (err) {

        console.log(err);
        res.send("Login Error");

    }

};

// Logout
exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login");
    });

};