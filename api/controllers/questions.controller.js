const {
    create,
    getQuestions,
    getQuestionById,
    getQuestionByApprove,
    updateQuestion,
    deleteQuestion,
    getQuestionsByDepartment,
    getQuestionsByCourseName,
    getQuestionCountByName,
    getQuestionCountByDepartment,
    getQuestionsByUser,
    performQuestionQuery
} = require("../services/questions.services");

const ITEMS_PER_PAGE = 10; // Adjust this value according to your desired page size

module.exports = {
    createQuestion: (req, res) => {
        const body = req.body;

        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Success"
            });
        });
    },
    getQuestionById: (req, res) => {
        const id = req.params.id;
        getQuestionById(id, (err, question) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!question) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }

            return res.json({
                success: 1,
                data: question
            });
        });
    },
    getQuestionByApprove: (req, res) => {
        const approved = req.params.approved;
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const offset = (page - 1) * 20;

        getQuestionByApprove(approved, offset, 20, (err, result) => { // Change this line
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                totalCount: result.totalCount, // Update to result.totalCount
                data: result.data // Update to result.data
            });
        });
    },
    getQuestions: (req, res) => {
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const offset = (page - 1) * 20;

        getQuestions(offset, 20, (err, result) => { // Change this line
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                totalCount: result.totalCount, // Update to result.totalCount
                data: result.data // Update to result.data
            });
        });
    },
    updateQuestion: (req, res) => {
        updateQuestion(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: 0,
                    message: err
                });
            }

            return res.json({
                success: 1,
                message: "Updated successfully!",
                data: req.body.questionId
            });
        });
    },
    deleteQuestion: (req, res) => {
        deleteQuestion(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!result) {
                return res.json({
                    success: 0,
                    message: "Record not found!"
                });
            }

            return res.json({
                success: 1,
                message: "Successfully deleted!"
            });
        });
    },
    getQuestionsByDepartment: (req, res) => {
        const department = req.params.department;
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const offset = (page - 1) * ITEMS_PER_PAGE;

        getQuestionsByDepartment(department, offset, ITEMS_PER_PAGE, (err, questions) => {
            if (err) {
                console.log(err);
                return;
            }

            if (!questions) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }

            return res.json({
                success: 1,
                data: questions
            });
        });
    },
    getQuestionsByCourseName: (req, res) => {
        const department = req.params.department;
        const shift = req.params.shift;
        const exam = req.params.exam;
        const name = req.params.name;
        const isApproved = req.params.isApproved || 1;
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const offset = (page - 1) * ITEMS_PER_PAGE;

        getQuestionsByCourseName(department, shift, exam, name, isApproved, offset, ITEMS_PER_PAGE, (err, questions) => {
            if (err) {
                console.log(err);
                return;
            }


            if (!questions) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }

            return res.json({
                success: 1,
                data: questions
            });
        });
    },

    getQuestionCountByName: (req, res) => {
        const department = req.params.department;
        const shift = req.params.shift;
        const exam = req.params.exam;
        const name = req.params.name;
        const isApproved = req.params.isApproved || 1;


        getQuestionCountByName(department, shift, exam, name, isApproved, (err, count) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Error fetching question count."
                });
            }

            if (count === 0) {
                return res.json({
                    success: 0,
                    data: count
                });
            }

            return res.json({
                success: 1,
                data: count
            });
        });
    },

    getQuestionCountByDepartment: (req, res) => {
        const department = req.params.department;
        const isApproved = req.params.isApproved || 1;


        getQuestionCountByDepartment(department, isApproved, (err, count) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Error fetching question count."
                });
            }

            if (count === 0) {
                return res.json({
                    success: 0,
                    data: count
                });
            }

            return res.json({
                success: 1,
                data: count
            });
        });
    },
    getQuestionsByUser: (req, res) => {
        const id = req.params.id;
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const offset = (page - 1) * ITEMS_PER_PAGE;

        getQuestionsByUser(id, offset, ITEMS_PER_PAGE, (err, questions) => {
            if (err) {
                console.log(err);
                return;
            }

            return res.json({
                success: 1,
                data: questions
            });
        });
    },
    performQuestionQuery: (req, res) => {
        const { key, value } = req.query; // Use req.query to access query parameters
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const limit = parseInt(req.query.limit) || 10; // Convert to integer with base 10
        const offset = (page - 1) * limit;

        console.log(req.query);

        performQuestionQuery(key, value, offset, limit, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }

            return res.json({
                success: 1,
                totalCount: result.totalCount, // Update to result.totalCount
                data: result.data // Update to result.data
            });
        });
    },


};