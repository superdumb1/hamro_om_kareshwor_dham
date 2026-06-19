import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
    secure: true,
});

export async function uploadImage(
    base64Data: string,
    options: any = {}
): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            base64Data,
            options,
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) return reject(error);
                if (!result) return reject(new Error('Empty upload result'));
                resolve(result);
            }
        );
    });
}

export async function deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

export default cloudinary;