const { serverUrl } = require("./temp");

module.exports = {
    getAchievementUploadUrl: (imageName) => {
        const baseUrl = `${serverUrl}images/achievementImg/`;
        return `${baseUrl}${imageName}`;
    },
    getNotificationUploadUrl: (UploadedDoc) => {
        const baseUrl = `${serverUrl}images/notificationDoc/`;
        return `${baseUrl}${UploadedDoc}`;
    },
}