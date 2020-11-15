export const MEDIA_URL = 'http://localhost:3333/public/uploads/';

export const media = (path: string) => {
    return MEDIA_URL + path;
};
