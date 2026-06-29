const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");

// Session
app.use(session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true
}));

// Make logged-in user available in all EJS pages
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Connect MongoDB ONLY ONCE
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("Mongo URI:", process.env.MONGO_URI);

    const db = mongoose.connection.db;
    console.log("Connected Database:", db.databaseName);

    console.log("MongoDB Connected");

    // Check Orders Collection
    const Order = require("./models/Order");
    const count = await Order.countDocuments();

    console.log("Total Orders:", count);
})
.catch(err => {
    console.log(err);
});

// Routes
app.use("/", require("./routes/productRoutes"));
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/cartRoutes"));
app.use("/", require("./routes/orderRoutes"));
app.use("/", require("./routes/adminRoutes"));

// Test Session Route
app.get("/session-test", (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.send("No user in session");
    }
});
// 404 Page
app.use((req, res) => {
    res.status(404).render("404");
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log("Server Started");
});