const Order = require("../models/Order");

// Checkout Page
exports.checkoutPage = (req, res) => {

    if (!req.session.cart || req.session.cart.length === 0) {
        return res.redirect("/cart");
    }

    let total = 0;

    req.session.cart.forEach(item => {
        total += Number(item.price);
    });

    res.render("checkout", {
        cart: req.session.cart,
        total: total
    });
};

// Place Order
exports.placeOrder = async (req, res) => {
    console.log("=== PLACE ORDER ROUTE CALLED ===");

    try {

        if (!req.session.user) {
            return res.redirect("/login");
        }

        let total = 0;

        req.session.cart.forEach(item => {
            total += Number(item.price);
        });

        const order = new Order({
            user: req.session.user.email,
            products: req.session.cart,
            total: total
        });

        console.log("Order Before Save:");
        console.log(order);

    const savedOrder = await order.save();

res.json(savedOrder);

        req.session.cart = [];

        res.send("<h1>Order Placed Successfully!</h1><a href='/'>Go Home</a>");

    } catch (err) {

        console.log("ORDER ERROR:");
        console.log(err);

        res.send("Order Failed");

    }

};
// My Orders
exports.myOrders = async (req, res) => {

    try {

        if (!req.session.user) {
            return res.redirect("/login");
        }

        const orders = await Order.find({
            user: req.session.user.email
        });

        res.render("orders", {
            orders
        });

    } catch (err) {

        console.log(err);

        res.send("Error Loading Orders");

    }

};