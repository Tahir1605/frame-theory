import multer from "multer";

const storage = multer.diskStorage({
    filename:function (req, file, callback) {
        callback(null,file.originalname)
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //5 mb limit
})

export default upload;