const router = require("express").Router();

const upload = require("../../util/multer");
const { getNotification, createNotification, getNotificationById, updateNotification, deleteNotification } = require("../controllers/notification");


router.get("/notifications", getNotification);
router.post("/new-notification", 
    upload("images/notificationDoc", [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]).single("uploadedDocument"),
    createNotification
);
router.get("/notification/:id", getNotificationById);
router.patch("/update-notification", 
    upload("images/notificationDoc", [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]).single("uploadedDocument"),
    updateNotification
);
router.delete("/delete-notification/:id", deleteNotification);


module.exports = router;