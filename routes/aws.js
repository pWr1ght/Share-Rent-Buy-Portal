//add dotenv functionality
require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const pool = require('../modules/dbcon').pool;


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});


router.post('/upload', (req, res) => {
    
    let uploadS3 = multer({
        storage: multerS3({
          s3: s3,
          acl: 'public-read',
          bucket: process.env.AWS_BUCKET,
          metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname})
          },
          key: (req, file, cb) => {
            cb(null, Date.now().toString() + '_' + file.originalname)
          }
        }),
        fileFilter:imageFilter
      }).array('aws_multiple_images');

    uploadS3(req, res, function(err){
        if (req.fileValidationError) {
            return res.send({err:req.fileValidationError,uploadStatus:"Failed to upload attachment(s)!"});
        }
        else if (!req.files) {
            return res.send({err:'Please select an image to upload',uploadStatus:"Failed to upload attachment(s)!"});
        }
        else if (err instanceof multer.MulterError) {
            return res.send({err:err,uploadStatus:"Failed to upload attachment(s)!"});
        }
        else if (err) {
            return res.send({err:err,uploadStatus:"Failed to upload attachment(s)!"});
        }
    
        console.log(req.body.listId);

        //build the img locations and send back
        let entryArr = [];
        let context = {};
        context.images = [];
        for(let i = 0; i < req.files.length; i++){
            let tmp = req.files[i].location.split('/');
            entryArr.push([req.body.listId,tmp[tmp.length-1],req.files[i].location]);
            context.images.push({location: req.files[i].location});
        }

        //add to database  
        let value = [entryArr];
        pool.query('INSERT INTO Attachments (itemID,attName,attDescr) VALUES ?;',value, function (err, result){
            if(err){
                context.err = err;
                context.uploadStatus = "Failed to upload attachment(s)!"
            }else{
                context.uploadStatus = "Attachment(s) uploaded successfully!";
            }
            res.send(context);
            
        });
        //res.send( context);
    });
    
  });

/*
router.post('/delete', (req,res)=>{
    let fileList = req.body.piclists;
    let parmas = {
        Bucket:process.env.AWS_BUCKET
    }

    //set file into paramas
    let fileArr = [];
    for(let i = 0; i < fileList.length; i++){
        let tmp = fileList[i].split('/');
        fileArr.push({Key:tmp[tmp.length-1]});
    }
    parmas.Delete = {Objects:fileArr,Quiet:false};

    //ask aws to delete files
    s3.deleteObjects(parmas, function(err, data){
        let context = {};
        if(err){
            context.err = err;
        }else{
            context.data = data;
        }
        res.send(context);
    })
})
*/

//functions
function imageFilter(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

module.exports = router;