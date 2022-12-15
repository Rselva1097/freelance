const express = require("express");
const freelancerRouter = require("./router/freelancerRouter");
const connectDb = require("./db/dbConnector");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use(freelancerRouter);



const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(3000, () => {
            console.log("Application started on port 3000");
        })
    } catch (err) {
        console.log(err)
    }
}

start();

module.exports= app;