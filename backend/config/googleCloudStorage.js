const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: undefined,
  credentials: {
    type: 'service_account',
    project_id: 'nofunmondays',
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/admin-805%40nofunmondays.iam.gserviceaccount.com',
  },
});

const bucketName = "nofunmondays";

module.exports = { storage, bucketName };
