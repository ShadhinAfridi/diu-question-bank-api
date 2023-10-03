const {
  getUserById,
  updateUserPassword,
  checkUserIsAvailable,
  updateVerificationStatus,
  createAboutInfo,
  getAboutInfo,
  updateAboutInfo,
  updateImage
} = require("../services/users.services");

module.exports = {
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (error, userRecord) => {
      if (error) {
        res.status(500).json({
          success: 0,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: 1,
          message: userRecord.toJSON()
        });
      }
    });
  },

  updatePassword: (req, res) => {
    const { email, newPassword } = req.body;
    updateUserPassword(email, newPassword, (error, userRecord) => {
      if (error) {
        res.status(500).json({
          success: 0,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: 1,
          message: 'Successfully updated password'
        });
      }
    });
  },

  checkUserIsAvailable: (req, res) => {
    const { email } = req.body;
    checkUserIsAvailable(email, (error, userRecord) => {
      if (error) {
        res.status(500).json({
          success: 0,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: 1,
          message: 'User available'
        });
      }
    });
  },

  updateVerificationStatus: (req, res) => {
    const { uid } = req.body
    updateVerificationStatus(uid, (error, userRecord) => {
      if (error) {
        res.status(500).json({
          success: 0,
          message: error.message
        });
      } else {
        res.status(200).json({
          success: 1,
          message: 'User updated'
        });
      }
    })
  },

  createAboutInfo: (req, res) => {
    const body = req.body;
    createAboutInfo(body, (err, results) => {
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

  getAboutInfo: (req, res) => {
    const id = req.params.id;
    getAboutInfo(id, (err, aboutData) => {  // Changed from 'res' to 'aboutData'
      if (err) {
        console.log(err);
        return;
      }
      if (!aboutData) {
        return res.json({
          success: 0,
          message: "Record not found"
        });
      }
      return res.json({
        success: 1,
        data: aboutData
      });
    });
  },

  updateAboutInfo: (req, res) => {
    const body = req.body;
    updateAboutInfo(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: err
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully!"
      });
    });
  },

  updateImage: (req, res) => {
    const body = req.body;
    updateImage(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: err
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully!"
      });
    });
  },

}