const express = require('express');
const router = express.Router();
const { 
    createUserAuth,
    updateUserAuth,
    getUserAuth,
    getUsers,
    sendApprovalEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
    createRejectedList,
    getRejectedDataById
} = require("../controllers/admin.controller");

router.get('/auth', getUsers);
router.get('/users', getUserAuth);
router.post('/users', createUserAuth);
router.patch('/users', updateUserAuth);
router.post('/send-email/approval', sendApprovalEmail);
router.post('/send-email/otp', sendVerificationEmail);
router.post('/send-email/welcome', sendWelcomeEmail);
router.post('/rejected', createRejectedList);
router.get('/rejected/:id', getRejectedDataById);


module.exports = router;