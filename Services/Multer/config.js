import multer from "multer";

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./attachments");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });
