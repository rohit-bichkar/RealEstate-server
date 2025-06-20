const express = require('express')
const router = express.Router();
const inquiryController = require('../controller/inquiryController')

router.post('/createInquiry',inquiryController.createInquiry);
router.get('/getAllInquiry',inquiryController.getAllInquiry);

module.exports=router