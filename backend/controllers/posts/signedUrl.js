const { storage, bucketName } = require('../../config/googleCloudStorage');

const signedUrl = async (req, res) => {
    try {
        const { fileName, fileType } = req.query;
        const file = storage.bucket(bucketName).file(fileName);
    
        const [signedUrl] = await file.getSignedUrl({
          action: 'write',
          expires: Date.now() + 15 * 60 * 1000,
          contentType: fileType,
        });
    
        res.json({
          signedUrl,
          publicUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

module.exports = { signedUrl }