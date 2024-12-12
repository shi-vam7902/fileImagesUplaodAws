
const multer = require('multer');
const cloudanryUpload = require('../util/CloundanryUpload');
//storage...

const storage = multer.diskStorage({
    destination:"./uploads/",
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},//bytes
    fileFilter:(req,file,cb)=>{
        
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
            cb(null,true);
        }
        else{
            cb(null,false);
            return cb("only .jpeg and .png files are allowed");

        }
    }
}).single("myImage");
//myImage : name of the file field in the form


const upoloadFile = async(req,res)=>{


        upload(req,res,async(err)=>{
            //console.log(req.body);
            if(err){
                res.json({
                    message:err || "error in uploading file"
                })
            }
            else{

                const cloudanry_response = await cloudanryUpload.uploadFileToCloudanry(req.file.path);
                console.log(cloudanry_response);

                //db logic...
                res.json({
                    message:"file uploaded successfully",
                    file:req.file,
                    secure_url:cloudanry_response.secure_url
                })
            }
        })

}
module.exports ={
    upoloadFile
}