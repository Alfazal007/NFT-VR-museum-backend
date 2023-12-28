import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        let uniqueSuffix = crypto.randomBytes(3).toString('hex');
        let newFilename = `${file.originalname}-${uniqueSuffix}`;
        cb(null, newFilename);
    }
});

export const upload = multer(
    {
        storage,
    }
);
