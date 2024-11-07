const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./models/db");
const port = process.env.PORT || 8080;
const AuthRouter = require("./routes/AuthRouter");
const prodRouter = require("./routes/ProductRouter");

app.use(bodyParser.json());
app.use(cors());
//We can specify the IPs of our choice inside () of cors in an array to tell it what IPs to allow.
app.use("/auth", AuthRouter);
app.use("/products", prodRouter);

app.listen(port, () => {
    console.log("Server is running on port " + port);
})
app.get("/", (req, res) => {
    res.send("Hello from home page.");
})