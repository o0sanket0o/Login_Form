const router = require("express").Router();

const {signUp, logIn} = require("../controllers/AuthController");
const {signUpValidation, loginValidation} = require("../middlewares/AuthValidation");

router.post('/signup', signUpValidation, signUp);
router.post('/login', loginValidation, logIn);

module.exports = router;