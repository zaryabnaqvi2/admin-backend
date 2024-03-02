const { validationResult } = require("express-validator");
const Notification = require("../models/notification");
const { getNotificationUploadUrl } = require("../../util/getUploadUrl");
const path = require("path");
const fs = require("fs");

module.exports = {
    createNotification: async (req, res) => {
        try {
            //extracting files coming from frontend
            const file = req.file;
            console.log("file", file)
            if (!file) {
                return res.status(415).json({
                    message: "Invalid Files",
                });
            }

            //extracting fileNames
            const fileName = file.filename;
       

            //creating a new scholarship
            const newNotification = new Notification({
                ...req.body,
                uploadedDocument: fileName
            });
            const NotificationDetails = await newNotification.save();
            
            NotificationDetails.uploadedDocument = getNotificationUploadUrl(NotificationDetails.uploadedDocument)

            // Returning success message
            res.status(201).json({
                message: "Notification created successfully",
                data: NotificationDetails,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    getNotification: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const notificationList = await Notification.find().sort({ _id: -1 });

            // Modifying the date format
            const notificationData = notificationList.map((notification) => {
                const issueDate = new Date(notification.issueDate);

                return {
                    ...notification.toObject(),
                    uploadedDocument: getNotificationUploadUrl(notification.uploadedDocument),
                    issueDate: {
                        month: issueDate.toLocaleString("default", { month: "long" }),
                        day: issueDate.getDate(),
                        year: issueDate.getFullYear(),
                    }
                };
            });

            res.json(notificationData);
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong with the api",
                error: error.message,
            });
        }
    },
    getNotificationById: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            const id = req.params.id; //To seprate the id from the parameter

            const foundNotification = await Notification.findById(id);
            if (!foundNotification) {
                return res.status(404).json({
                    message: "Notification not found",
                });
            }

            // Modifying the date format
            const issueDate = new Date(foundNotification.issueDate);
            const notificationData = {
                ...foundNotification.toObject(),
                _id: foundNotification._id.toString(),
                issueDate: {
                    month: issueDate.toLocaleString("default", { month: "long" }),
                    day: issueDate.getDate(),
                    year: issueDate.getFullYear(),
                },
            };

            notificationData.uploadedDocument = getNotificationUploadUrl(notificationData.uploadedDocument)

            res.json(notificationData);
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong with the api",
                error: error.message,
            });
        }
    },
    updateNotification: async (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                return res.status(415).json({
                    message: "Invalid File",
                });
            }

            const id = req.body.notification_id;
            const updatedNotification = await Notification.findByIdAndUpdate(id, {
                title: req.body.title,
                description: req.body.description,
                issueDate: req.body.issueDate,
                uploadedDocument: file.filename
            }, { new: true }); // { new: true } option returns the updated document

            if (!updatedNotification) {
                return res.status(404).json({
                    message: "Notification not found",
                });
            }

            updatedNotification.uploadedDocument = getNotificationUploadUrl(updatedNotification.uploadedDocument)

            // Return the updated notification
            res.status(200).json({
                message: "Notification updated successfully",
                data: updatedNotification,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    deleteNotification: async (req, res) => {
        try {
            const id = req.params.id;

            const deletedNotification = await Notification.findByIdAndDelete(id);
            if (!deletedNotification) {
                return res.status(404).json({
                    message: "Notification not found",
                });
            }

            // Deleting associated file
            const docPath = path.join(__dirname, "../../images/notificationDoc", deletedNotification.uploadedDocument);
            fs.unlinkSync(docPath);

            res.status(200).json({
                message: "Notification deleted successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
}
