export const MEDIA_URL = 'http://localhost:3333/public/uploads/';

export const media = (
    folder: string,
    filename: string,
    isThumbnail: boolean = false
) => {
    return `${MEDIA_URL}/${folder}/${
        isThumbnail ? 'thumbnail-' : ''
    }${filename}`;
};
