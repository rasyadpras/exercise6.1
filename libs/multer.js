const multer = require('multer');
const path = require('path');

const filename = (req, file, callback) => {
    const fileName = Date.now() + path.extname(file.originalname);
    callback(null, fileName);
};

const generateStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination);
        }
    }),
    filename
};

module.export = {
    image: multer({
        storage: generateStorage('./media/images'),
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

            if (allowedMimeTypes.includes(file.mimetype)) {
                callback(null, true);
            } else {
                const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed`);
                callback(err, false);
            }
        },
        onError: (err, next) => {
            next(err);
        }
    })
};