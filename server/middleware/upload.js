const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const dbUri = `mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`;

const storage = new GridFsStorage({
    url: dbUri,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    file: (res, file) => {
        const match = ['image/png', 'image/jpeg', 'image/jpg'];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now}-image-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-image-${file.originalname}`,
        }
    }
});

module.exports = multer({ storage });

