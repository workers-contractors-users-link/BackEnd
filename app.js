require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connectDB");

const app = express();

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

const mongoDBUrl = process.env.MONGO_DB_URL;
const port = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDB(mongoDBUrl).then(() =>
            console.log("Database connection established")
        );

        app.listen(port, () => console.log(`Listening on port : ${port}`));
    } catch (error) {
        console.log(error);
    }
};

startServer();
