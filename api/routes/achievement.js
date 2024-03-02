const router = require("express").Router();
const { validateCreateAchievement, validateUpdateAchievement } = require("../../util/achieveInputValidation");
const upload = require("../../util/multer");

const { 
    getAchievement, 
    createAchievement, 
    getAchievementById, 
    updateAchievement,
    deleteAchievement
} = require("../controllers/achievement");


router.get("/achievement", getAchievement);
router.post("/new-achievement", 
    upload("images/achievementImg", [
        "image/jpeg",
        "image/jpg",
        "image/png",
    ]).single("imageUrl"),
    // validateCreateAchievement,
    createAchievement
);
router.get("/achievement/:id", getAchievementById);
router.patch("/update-achievement",
    upload("images/achievementImg", [
        "image/jpeg",
        "image/jpg",
        "image/png",
    ]).single("imageUrl"),
    // validateUpdateAchievement,
    updateAchievement
);
router.delete("/delete-achievement/:id", deleteAchievement);



module.exports = router;