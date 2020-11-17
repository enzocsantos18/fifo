import multer from 'multer';
import { v4 as uuid } from 'uuid';

const defaultConfig = {
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filters = ['image/png', 'image/jpeg', 'image/pjpeg', 'image/gif'];

        cb(null, filters.includes(file.mimetype));
    },
} as multer.Options;

function createStorage(path: string) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/${path}`);
        },
        filename: function (req, file, cb) {
            cb(null, `${uuid()}-${file.originalname}`);
        },
    });
}

const UserAvatarStorage = multer({
    storage: createStorage('uploads/user'),
    ...defaultConfig,
});

const GameBannerStorage = multer({
    storage: createStorage('uploads/game'),
    ...defaultConfig,
});

export { UserAvatarStorage, GameBannerStorage };
