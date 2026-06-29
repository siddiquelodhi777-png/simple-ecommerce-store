// Display Cart
exports.viewCart = (req, res) => {

    if (!req.session.cart) {
        req.session.cart = [];
    }

    let total = 0;

    req.session.cart.forEach(item => {
        total += Number(item.price);
    });

    res.render("cart", {
        cart: req.session.cart,
        total: total
    });
};

// Add Product to Cart
exports.addToCart = (req, res) => {

    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push({
        id: req.body.id,
        name: req.body.name,
        price: Number(req.body.price)
    });

    res.redirect("/cart");
};

// Remove Product
exports.removeFromCart = (req, res) => {

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const id = req.params.id;

    req.session.cart = req.session.cart.filter(item => item.id !== id);

    res.redirect("/cart");
};