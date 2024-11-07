const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)
.then(() => {
    console.log("Database connected successfully.");
}).catch((err) => {
    console.log("Error connecting to database: " + err);
})
