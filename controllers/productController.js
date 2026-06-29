const Product = require("../models/Product");

// Home Page
exports.home = async (req, res) => {

    try {

        const search = req.query.search || "";
        const sort = req.query.sort || "";
        const page = parseInt(req.query.page) || 1;

        const limit = 6;
        const skip = (page - 1) * limit;

        const query = {
            name: { $regex: search, $options: "i" }
        };

        let sortOption = {};

        if (sort === "low") {
            sortOption = { price: 1 };
        }
        else if (sort === "high") {
            sortOption = { price: -1 };
        }
        else if (sort === "az") {
            sortOption = { name: 1 };
        }
        else if (sort === "za") {
            sortOption = { name: -1 };
        }

        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.max(1, Math.ceil(totalProducts / limit));

        res.render("index", {
            products,
            search,
            sort,
            currentPage: page,
            totalPages
        });

    } catch (err) {

        console.log(err);
        res.send("Error Loading Products");

    }

};

// Product Details
exports.getProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.send("Product not found");
        }

        res.render("product", {
            product
        });

    } catch (err) {

        console.log(err);
        res.send("Product not found");

    }

};