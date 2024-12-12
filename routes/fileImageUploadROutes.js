const express = require("express");
const router = express.Router();
const fileImageController = require("../controller/fileImageUploadController");
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "../uploads",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: function (req, file, cb) {
//     if (
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/png" ||
//       file.mimetype === "application/pdf" ||
//       file.mimetype === "application/json"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg, .jpeg, .pdf format allowed!"));
//     }
//   },
// }).single("singleFile");

// router.post("/imagefile", fileImageController.savePathToDb);
// router.post("/awsupload", fileImageController.uploadFiletoBucket);
// router.post("/imagefile", (req, res, next) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ error: err.message });
//     } else if (err) {
//       return res.status(400).json({ error: err.message });
//     }
//     fileImageController.addImagesToDB(req, res, next);
//   });
// });
router.get("/imagefile", fileImageController.getImagesFromDB);
router.post("/imagefile", fileImageController.addImagesToDB);
module.exports = router;
