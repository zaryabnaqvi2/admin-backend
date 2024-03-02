const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const achievementSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true,
            default: new Date().getFullYear()
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
