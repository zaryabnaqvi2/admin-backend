const { body } = require("express-validator");

module.exports = {

  // Validation middleware for login
  validateLogin: [
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],

  // Validation middleware for sign up
  validateSignUp: [
    body("fullName")
      .notEmpty().withMessage("Full Name cannot be empty"),
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],

  // Validation middleware for Forgot Password
  validateForgotPassword: [
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is invalid"),
  ],

  // Validation middleware for Reset Password
  validateResetPassword: [
    body("token")
      .notEmpty().withMessage("token is required")
      .isString().withMessage("token is invalid"),

    body("newPassword")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],

};
