const mongoose = require("mongoose");

const connectDb = (url) => {
    console.log(url);
    return mongoose.connect(url, {
        // userNewUrlParser: true,
    });
};

module.exports = connectDb;