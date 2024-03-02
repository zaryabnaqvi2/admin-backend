const { validationResult } = require("express-validator");
const Achievement = require("../models/achievement");
const { serverUrl } = require("../../util/temp");
const { getAchievementUploadUrl } = require("../../util/getUploadUrl");
const achievement = require("../models/achievement");
const path = require("path");
const fs = require("fs");

module.exports = {
    createAchievement: async (req, res) => {
        try {
            const image = req.file;
            console.log("image", image)
            if (!image) {
                return res.status(415).json({
                    message: "Invalid File",
                });
            }

            //creating a new scholarship
            const newAchievement = new Achievement({
                ...req.body,
                imageUrl: image.filename
            });
            const AchievementDetails = await newAchievement.save();

            AchievementDetails.imageUrl = getAchievementUploadUrl(AchievementDetails.imageUrl)

            // Returning success message
            res.status(201).json({
                message: "Achievement created successfully",
                data: AchievementDetails,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    getAchievement: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const achievementList = await Achievement.find().sort({ _id: -1 });

            achievementList.forEach((achievement) => {
                achievement.imageUrl = getAchievementUploadUrl(achievement.imageUrl);
            });

            res.json(achievementList);
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong with the api",
                error: error.message,
            });
        }
    },
    getAchievementById: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const id = req.params.id; //To seprate the id from the parameter

            const foundAchievement = await Achievement.findById(id);
            if (!foundAchievement) {
                return res.status(404).json({
                    message: "Achievement not found",
                });
            }
            foundAchievement.imageUrl = getAchievementUploadUrl(foundAchievement.imageUrl)
            res.json(foundAchievement);
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong with the api",
                error: error.message,
            });
        }
    },
    updateAchievement: async (req, res) => {
        try {
            const image = req.file;
            if (!image) {
                return res.status(415).json({
                    message: "Invalid File",
                });
            }

            const id = req.body.achievement_id;
            const updatedAchievement = await Achievement.findByIdAndUpdate(id, {
                title: req.body.title,
                description: req.body.description,
                year: req.body.year,
                imageUrl: image.filename
            }, { new: true }); // { new: true } option returns the updated document

            if (!updatedAchievement) {
                return res.status(404).json({
                    message: "Achievement not found",
                });
            }

            updatedAchievement.imageUrl = getAchievementUploadUrl(updatedAchievement.imageUrl)

            // Return the updated achievement
            res.status(200).json({
                message: "Achievement updated successfully",
                data: updatedAchievement,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    deleteAchievement: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedAchievement = await Achievement.findByIdAndDelete(id);
            if (!deletedAchievement) {
                return res.status(404).json({
                    message: "Achievement not found",
                });
            }

            // Deleting associated image file
            const imagePath = path.join(__dirname, "../../images/achievementImg", deletedAchievement.imageUrl);
            fs.unlinkSync(imagePath);

            res.status(200).json({
                message: "Achievement deleted successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
}