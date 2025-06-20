const express = require('express');

const router = express.Router();
const propertiesController = require('../controller/propertiesController')
const {auth} = require('../middleware/auth')
const multermiddleware = require('../middleware/multer')


router.get('/getAllProperties', propertiesController.getAllProperties);
router.get('/getPropertiesByID/:ID', propertiesController.getPropertiesByID);
router.post('/createProperties',auth,multermiddleware.single('image'), propertiesController.createProperties);
router.put('/updateProperties/:ID', propertiesController.updateProperties);
router.delete('/deleteProperties/:ID', propertiesController.deleteProperties);


router.post('/interested/:ID',auth,propertiesController.markAsInterested);
router.get('/interestedUsers/:ID',auth,propertiesController.getInterestedUsers);




module.exports = router