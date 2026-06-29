module.exports = (req, res, next) => {

    // User is not logged in
    if (!req.session.user) {
        return res.redirect("/login");
    }

    // User is logged in but not an admin
    if (!req.session.user.isAdmin) {
        return res.redirect("/");
    }

    // User is an admin
    next();

};