const { body } = require("express-validator");

module.exports = {
    // Validation middleware for New Achievement
    validateCreateAchievement: [
        body("title")
            .notEmpty().withMessage("title cannot be empty")
            .isString().withMessage("title must be string"),
        body("description")
            .notEmpty().withMessage("description is required")
            .isString().withMessage("description must be string"),
        body("year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year must be a 4-digit number")
            .isInt({ min: 1901, max: 2155 }).withMessage("Year must be within the range of 1901 to 2155"),
    ],
    // Validation middleware for Update Achievement
    validateUpdateAchievement: [
        body("achievement_id")
            .notEmpty().withMessage("achievement_id cannot be empty")
            .isString().withMessage("achievement_id must be string"),
        body("title")
            .notEmpty().withMessage("title cannot be empty")
            .isString().withMessage("title must be string"),
        body("description")
            .notEmpty().withMessage("description is required")
            .isString().withMessage("description must be string"),
        body("year").isNumeric().isLength({ min: 4, max: 4 }).withMessage("Year must be a 4-digit number")
            .isInt({ min: 1901, max: 2155 }).withMessage("Year must be within the range of 1901 to 2155"),
    ],

};
