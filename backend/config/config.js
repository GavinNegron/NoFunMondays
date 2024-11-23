require('dotenv').config(); // Make sure dotenv is loaded

module.exports = {
    googleCloud: {
        keyFilename: process.env.GCLOUD_FILE,  // Directly use the value from .env
        projectId: 'nofunmondays',  // Directly use the value from .env
        bucketName: 'nofunmondays',  // Directly use the value from .env
    },
};
