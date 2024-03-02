const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to create folder if it doesn't exist
const createFolderIfNotExist = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

const fileStorage = (destination) =>
    multer.diskStorage({
        destination: (req, file, cb) => {
            // Create folder if it doesn't exist
            createFolderIfNotExist(destination);
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            const originalnameWithoutSpaces = file.originalname.replace(/\s/g, '');
            cb(null, `${Date.now()}-${originalnameWithoutSpaces}`);
        },
    });

const upload = (destination, allowedFileTypes) =>
    multer({
        storage: fileStorage(destination),
        fileFilter: (req, file, cb) => {
            // Check if file type is allowed
            const isAllowed = allowedFileTypes.includes(file.mimetype);
            if (isAllowed) {
                // Accept file
                cb(null, true);
            } else {
                // Reject file
                cb(new Error("File type not allowed"));
            }
        },
    });

module.exports = upload;
