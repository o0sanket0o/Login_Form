const ensureAuth = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuth ,(req, res) => {
    res.status(200).json([
        {
            name: " Mobile", 
            price: 10000,
        },
        {
            name: "Television",
            price: 20000,
        },
    ])
})

module.exports = router;