const fileImageModel = require("../model/fileImagesUploadModel");
const aws = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
exports.addImagesToDB = async (req, res) => {
  const file = req.file;
  console.log("file", file);
  const fileImagedetails = new fileImageModel({
    file: file.path || null,
    fileDescription: req.body.fileDescription,
  });
  console.log("req.body", req.body);

  await fileImagedetails.save().then((data) => {
    if (!data || data == null) {
      res.json({
        message: "Image not uploaded",
        status: 400,
        data: data,
      });
    } else {
      res.json({
        message: "Image uploaded successfully",
        status: 200,
        data: data,
      });
    }
  });
};
// exports.savePathToDb = async (req, res) => {
//   const filepath = req.file.path;
//   const newfile = new fileImageModel({
//     file: filepath,
//     fileDescription: req.body.fileDescription,
//   });
//   await newfile
//     .save()
//     .then((data) => {
//       if (!data || data == null) {
//         res.json({
//           message: "Image not uploaded",
//           status: 400,
//           data: data,
//         });
//       } else {
//         res.json({
//           message: "Image uploaded successfully",
//           status: 200,
//           data: data,
//         });
//       }
//     })
//     .catch((err) => {
//       res.json({
//         message: "Image not uploaded",
//         status: 400,
//         data: err,
//       });
//     });
// };
// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// exports.uploadFiletoBucket = async (req, res) => {
//   const file = req.file;
//   // Create a file name based on the current date and time
//   const currentDate = new Date().toISOString().replace(/:/g, "-"); // Replace ':' with '-' to avoid invalid file name characters
//   const fileName = `${currentDate}_${name}_${file.originalname}`;

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `${file}/${fileName}`, // Construct S3 object key with folder structure and custom file name
//     Body: file.buffer, // Use the buffer directly from multer memory storage
//   };

//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Failed to upload resume");
//     }
//     console.log(`File uploaded successfully. ${data.Location}`);
//     const fileDetails = new fileImageModel({
//       file: data.Location,
//       fileDescription: req.body.fileDescription,
//     });
//     fileDetails
//       .save()
//       .then((data) => {
//         if (!data || data == null) {
//           res.json({
//             message: "Image not uploaded",
//             status: 400,
//             data: data,
//           });
//         } else {
//           res.json({
//             message: "Image uploaded successfully",
//             status: 200,
//             data: data,
//           });
//         }
//       })
//       .catch((err) => {
//         res.json({
//           message: "Image not uploaded",
//           status: 400,
//           data: err,
//         });
//       });
//   });
// };
exports.getImagesFromDB = async (req, res) => {
  await fileImageModel
    .find()
    .then((data) => {
      if (!data || data == null) {
        res.json({
          message: "Image not found",
          status: 400,
          data: data,
        });
      } else {
        const extractedData = data.map((item) => {
          return {
            image: item.image,
            file: item.file,
          };
        });
        res.json({
          message: "Image found successfully",
          status: 200,
          data: extractedData,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Image not found",
        status: 400,
        data: err,
      });
    });
};
