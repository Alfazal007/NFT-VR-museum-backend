import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
);


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        return response;
    } catch (err) {
        // delete file from server even if cloudinary upload to cloudinary failed
        fs.unlinkSync(localFilePath);
        console.log(err);
        return null;
    }
};

const deleteFromCloudinary = async (url) => {
    try {
        if (!url) {
            return null;
        }
        const splitUrl = url.split("/");
        const filename = splitUrl[splitUrl.length - 1];
        const publicId = filename.split(".")[0];
        if (!publicId) {
            return null;
        }
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (err) {
        return null;
    }
};


export { uploadOnCloudinary, deleteFromCloudinary };