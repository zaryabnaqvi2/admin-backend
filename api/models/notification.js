const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        issueDate: {
            type: Date, 
            required: true,
            default: Date.now 
        },
        uploadedDocument: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
