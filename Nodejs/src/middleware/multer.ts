import multer from "multer";

const imageFilter = function (req, file, cb) {
  // console.log("file", file);
  // console.log("req", req.file);

  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
const UPLOAD_PATH = "uploads";
const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: imageFilter,
});
