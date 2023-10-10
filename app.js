require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connectDB");
const { authRouter } = require("./routes");
const { pageNotFound, errorHandler } = require("./middlewares");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1", authRouter);

app.use(errorHandler);
app.use(pageNotFound);

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
