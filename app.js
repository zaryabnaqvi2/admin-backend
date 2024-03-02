require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/user");
const notificationRoutes = require("./api/routes/notification");
const achievementRoutes = require("./api/routes/achievement");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
console.log(path.join(__dirname, 'images'));

// To protect from CORS

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(cors())

// Routes
app.use(userRoutes);
app.use(notificationRoutes);
app.use(achievementRoutes);

// setting mongoose connection and starting server
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MongoDB_URI)
    .then(() => {
        app.listen(process.env.APP_PORT, () => {
            console.log("Server up and running on PORT:", process.env.APP_PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

