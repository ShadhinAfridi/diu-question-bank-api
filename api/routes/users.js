const express = require('express');
const router = express.Router();
const { 
    getUserById, 
    updatePassword ,
    checkUserIsAvailable,
    updateVerificationStatus,
    getAboutInfo,
    createAboutInfo,
    updateAboutInfo,
    updateImage
} = require("../controllers/users.controller");

router.get('/:id', getUserById);
router.post('/update-password', updatePassword);
router.post('/check-user', checkUserIsAvailable);
router.post('/verify', updateVerificationStatus);
router.get('/about/:id', getAboutInfo);
router.post('/about', createAboutInfo);
router.patch('/about', updateAboutInfo);
router.patch('/about/image', updateImage);

module.exports = router;