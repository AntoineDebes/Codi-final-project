import multer from "multer";

// const imageFilter = function (req, file, cb) {
//   console.log("file", file);
//   console.log("req", req.file);

//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return cb(new Error("Only image files are allowed!"), false);
//   }
//   cb(null, true);
// };
// const UPLOAD_PATH = "uploads";
// const upload = multer({
//   dest: `${UPLOAD_PATH}/`,
//   fileFilter: imageFilter,
// });

export default function multerUpload({ destination }) {
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname.replaceAll(" ", ""));
    },
  });
  return multer({ storage });
}
