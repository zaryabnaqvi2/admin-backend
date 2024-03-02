const router = require("express").Router();

const { 
    login, 
    signUp, 
    forgotPassword, 
    resetPassword 
} = require("../controllers/user");

const {
    validateLogin,
    validateSignUp,
    validateForgotPassword,
    validateResetPassword,
} = require("../../util/userInputValidation");

//authentication
router.post("/login", validateLogin, login);
router.post("/signup", validateSignUp, signUp);
router.post("/forgot-password", validateForgotPassword, forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);


module.exports = router;