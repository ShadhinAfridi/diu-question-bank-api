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
} = require("../services/admin.services");

module.exports = {
    createUserAuth: (req, res) => {
        const body = req.body;
        createUserAuth(body, (err, results) => {
            if (err) {
                console.error(err); // Log the error for debugging purposes
                return res.status(500).json({
                    success: 0,
                    message: `Database connection error: ${err.message}` // Include the error message in the response
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Success"
            });
        });
    },
    updateUserAuth: (req, res) => {
        const body = req.body;
        updateUserAuth(body, (err, results) => {
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
    getUserAuth: (req, res) => {
        const { orderColumn, order } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        getUserAuth(orderColumn, order, offset, limit, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: err.message,
                });
            }

            return res.json({
                success: 1,
                totalCount: result.totalCount,
                data: result.data,
            });
        });
    },

    getUsers: (req, res) => {
        getUsers(req.query.pageToken, (error, listUsersResult) => {
            if (error) {
                res.status(500).json({
                    success: 0,
                    message: error.message
                });
            } else {
                res.status(200).json({
                    success: 1,
                    message: listUsersResult
                });
            }
        });
    },
    createRejectedList: (req, res) => {
        const body = req.body;
        createRejectedList(body, (err, result) => {
            if (err) {
                console.error(err); // Log the error for debugging purposes
                return res.status(500).json({
                    success: 0,
                    message: `Database connection error: ${err.message}` // Include the error message in the response
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Success"
            });
        });
    },
    getRejectedDataById: (req, res) => {
        const id = req.params.id; // Get the ID from the URL parameter
        getRejectedDataById(id, (err, result) => {
            if (err) {
                console.error(err); // Log the error for debugging purposes
                return res.status(500).json({
                    success: 0,
                    message: `Database connection error: ${err.message}` // Include the error message in the response
                });
            }
            if (!result) {
                return res.status(404).json({
                    success: 0,
                    message: "Data not found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Success",
                data: result
            });
        });
    },
    async sendApprovalEmail(req, res) {
        try {
            // Parse email data from the request body
            const data = req.body;

            // Send the email using the email service
            await sendApprovalEmail(data);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async sendVerificationEmail(req, res) {
        try {
            // Parse email data from the request body
            const { to, subject, recipientName, otp } = req.body;

            // Send the email using the email service
            await sendVerificationEmail(to, subject, recipientName, otp);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async sendWelcomeEmail(req, res) {
        try {
            // Parse email data from the request body
            const { to, subject, recipientName } = req.body;

            // Send the email using the email service
            await sendWelcomeEmail(to, subject, recipientName);

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

};
