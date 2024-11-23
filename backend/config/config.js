require('dotenv').config(); // Make sure dotenv is loaded

module.exports = {
    googleCloud: {
        keyFilename: process.env.GCLOUD_FILE,  // Directly use the value from .env
        projectId: process.env.GCLOUD_PROJECTID,  // Directly use the value from .env
        bucketName: process.env.GCLOUD_BUCKETNAME,  // Directly use the value from .env
    },
};
