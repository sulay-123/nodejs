const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require("path");

//========================================= NODE SERVER Image Upload ==================================================//

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb, error) {
            cb(null, 'public/images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname.replace(" ", "-"));
        }
    }),
    limits: {
        fieldSize: 1024 * 1024 * 2,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
}).single('profile');

const uploadingsong = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb, error) {
            cb(null, 'public/song');
        },
        filename: function (req, file, cb) {
            let filename = req.customFilename;
            cb(null, Date.now() + "_" + file.originalname.replace(" ", "-"));
        }
    }),
    limits: {
        fieldSize: 1024 * 1024 * 2,
    }, 
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext == '.mp3'){
            cb(null, true)
        }else{
            cb(null, false)
            return cb(new Error('Only mp3 file are allowed'))
        }
    },
}).single('song');

module.exports = {
    uploadingsong,
    upload
}