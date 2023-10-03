const { 
    createQuestion, 
    getQuestionById, 
    getQuestionByApprove,
    getQuestions, 
    updateQuestion, 
    deleteQuestion,
    getQuestionsByDepartment,
    getQuestionsByCourseName,
    getQuestionCountByName,
    getQuestionCountByDepartment,
    getQuestionsByUser,
    performQuestionQuery
} = require("../controllers/questions.controller");

const express = require('express');
const router = express.Router();

router.post('/', createQuestion);
router.get('/', getQuestions);
router.get('/query', performQuestionQuery);
router.get('/approve/:approved', getQuestionByApprove);
router.get('/user/:id', getQuestionsByUser);
router.get('/:id', getQuestionById); 
router.patch('/', updateQuestion);
router.delete('/', deleteQuestion);
router.get('/department/:department', getQuestionsByDepartment)
router.get('/course/:department/:shift/:exam/:name/:isApproved', getQuestionsByCourseName)
router.get('/count/:department/:shift/:exam/:name/:isApproved',getQuestionCountByName)
router.get('/count/:department/:isApproved',getQuestionCountByDepartment)

module.exports = router;