const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
console.log("ADMIN CONTROLLER LOADED");

// ======================
// Admin Dashboard
// ======================

exports.dashboard = async (req, res) => {
    try {

        const products = await Product.countDocuments();
        const users = await User.countDocuments();
        const orders = await Order.countDocuments();

        const revenueData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$total" }
                }
            }
        ]);

        const revenue =
            revenueData.length > 0
                ? revenueData[0].totalRevenue
                : 0;

        const latestProducts = await Product.find()
            .sort({ _id: -1 })
            .limit(5);

        const latestUsers = await User.find()
            .sort({ _id: -1 })
            .limit(5);

        const latestOrders = await Order.find()
            .sort({ orderDate: -1 })
            .limit(5);

        res.render("admin", {
            products,
            users,
            orders,
            revenue,
            latestProducts,
            latestUsers,
            latestOrders
        });

    } catch (err) {

        console.log(err);
        res.send("Dashboard Error");

    }
};

// ======================
// Products
// ======================

// Show Products
exports.products = async (req, res) => {
    try {

        const products = await Product.find();

        // Debug Information
        console.log("==================================");
        console.log("Database:", Product.db.name);
        console.log("Collection:", Product.collection.name);
        console.log("Total Products:", products.length);
        console.log(products);
        console.log("==================================");

        res.render("adminProducts", {
            products
        });

    } catch (err) {

        console.log(err);
        res.send("Error Loading Products");

    }
};

// Add Product Page
exports.addProductPage = (req, res) => {

    res.render("addProduct");

};

// Save Product
exports.addProduct = async (req, res) => {

    try {

        console.log("========== ADD PRODUCT ==========");
        console.log(req.body);

        const {
            name,
            price,
            image,
            description
        } = req.body;

        if (!name || !price || !image || !description) {
            return res.send("Please fill all fields.");
        }

        const product = new Product({
            name,
            price,
            image,
            description
        });

        await product.save();

        console.log("Saved Successfully");
        console.log("Database:", Product.db.name);
        console.log("Collection:", Product.collection.name);
        console.log(product);
        console.log("===============================");

        res.redirect("/admin/products");

    } catch (err) {

        console.log("SAVE ERROR");
        console.log(err);
        res.send(err);

    }

};

// Edit Product Page
exports.editProductPage = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.send("Product Not Found");
        }

        res.render("editProduct", {
            product
        });

    } catch (err) {

        console.log(err);
        res.send("Error");

    }

};

// Update Product
exports.updateProduct = async (req, res) => {

    try {

        await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                price: req.body.price,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        );

        res.redirect("/admin/products");

    } catch (err) {

        console.log(err);
        res.send("Update Failed");

    }

};

// Delete Product
exports.deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(req.params.id);

        res.redirect("/admin/products");

    } catch (err) {

        console.log(err);
        res.send("Delete Failed");

    }

};

// ======================
// Users
// ======================

exports.users = async (req, res) => {

    try {

        const users = await User.find();

        res.render("adminUsers", {
            users
        });

    } catch (err) {

        console.log(err);
        res.send("Error Loading Users");

    }

};

// ======================
// Orders
// ======================

exports.orders = async (req, res) => {

    try {

        const orders = await Order.find();

        res.render("adminOrders", {
            orders
        });

    } catch (err) {

        console.log(err);
        res.send("Error Loading Orders");

    }

};