const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/category.controller");
const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");
const multer = require("multer");
const upload = multer();
const createValidate = require("../../validates/product.validate");

router.get('/', controller.index)

router.get("/create", controller.create)

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    createValidate.createPost,
    controller.createPost
  );
module.exports = router;