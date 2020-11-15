import multer from 'multer';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${uuid()}-${file.originalname}`);
    },
});

export default multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filters = ['image/png', 'image/jpeg', 'image/pjpeg', 'image/gif'];

        cb(null, filters.includes(file.mimetype));
    },
});
