require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connectDB");
const { authRouter, contractRouter } = require("./routes");
const { pageNotFound, errorHandler } = require("./middlewares");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

console.log("hii");

app.use("/api/auth", authRouter);
app.use("/api/contract", contractRouter);

app.use(errorHandler);
app.use(pageNotFound);

const mongoDBUrl = process.env.MONGO_DB_URL;
const port = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await connectDB(mongoDBUrl).then(() =>
            console.log("Database connection established")
        );

        app.listen(port, () => console.log(`Listening on port : port`));
    } catch (error) {
        console.log(error);
    }
};

startServer();
