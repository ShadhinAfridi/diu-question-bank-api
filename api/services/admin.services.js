require("dotenv").config();
const pool = require("../config/database");
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const {
  verificationEmail,
  passRecoverEmail,
  welcomeEmail,
  questionApprovedEmail,
  questionRejectedEmail
} = require('../email/email.template')

module.exports = {
  getUsers: (pageToken, callBack) => {
    const maxResults = 1000; // Adjust this as needed
    admin
      .auth()
      .listUsers(maxResults, pageToken)
      .then((listUsersResult) => {
        callBack(null, listUsersResult);
      })
      .catch((error) => {
        callBack(error, null);
      });
  },
  createUserAuth: (data, callBack) => {
    pool.query(
      'INSERT INTO auth (uid, displayName, email, emailVerified, disabled, creationTime, lastRefreshTime, lastSignInTime, tokensValidAfterTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.uid,
        data.displayName,
        data.email,
        data.emailVerified,
        data.disabled,
        data.creationTime,
        data.lastRefreshTime,
        data.lastSignInTime,
        data.tokensValidAfterTime
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateUserAuth: (data, callBack) => {
    pool.query(
      'UPDATE auth SET lastRefreshTime = ?, lastSignInTime = ?, tokensValidAfterTime = ? WHERE uid = ?',
      [
        data.lastRefreshTime,
        data.lastSignInTime,
        data.tokensValidAfterTime,
        data.uid
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserAuth: (orderColumn, order, offset, limit, callBack) => {
    pool.query(
      'SELECT COUNT(*) as totalCount FROM auth',
      [],
      (countErr, countResult) => {
        if (countErr) {
          return callBack(countErr);
        }
        const totalCount = countResult[0].totalCount;

        pool.query(
          `SELECT * FROM auth ORDER BY ${orderColumn} ${order} LIMIT ?, ?`,
          [offset, limit],
          (err, res, fields) => {
            if (err) {
              return callBack(err);
            }
            return callBack(null, { totalCount, data: res });
          }
        );
      }
    );
  },

  createRejectedList: (data, callBack) => {
    const sql = 'INSERT INTO rejected_list (id, admin_id, comment) VALUES (?, ?, ?)';
    pool.query(sql, [data.id, data.admin_id, data.comment], (err, result) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, result);
    });
  },
  getRejectedDataById: (id, callBack) => {
    const sql = 'SELECT * FROM rejected_list WHERE id = ?';
    pool.query(sql, [id], (err, result) => {
      if (err) {
        return callBack(err);
      }
      if (result.length === 0) {
        return callBack(null, null); // Return null if item is not found
      }
      return callBack(null, result[0]); // Return the first item (assuming ID is unique)
    });
  },
  async sendApprovalEmail(data) {
    try {
      // Create a Nodemailer transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.APPROVAL_EMAIL,
          pass: process.env.APPROVAL_PASSWORD,
        },
      });

      // Define email data
      const mailOptions = {
        from: {
          name: 'DIU Question Bank', // Set the sender's name here
          address: process.env.APPROVAL_EMAIL, // Set the sender's email address
        },
        to: data.to, // Set the recipient's email address
        subject: data.subject, // Set the email subject
        html: (data.subject === 'Congratulations! Your Question Has Been Approved') ?
          questionApprovedEmail(data) : questionRejectedEmail(data),
      };

      // Send the email
      transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  },

  async sendVerificationEmail(to, subject, recipientName, otp) {
    try {
      // Create a Nodemailer transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.OTP_EMAIL,
          pass: process.env.OTP_PASSWORD,
        },
      });

      // Define email data
      const mailOptions = {
        from: {
          name: 'DIU Question Bank', // Set the sender's name here
          address: process.env.OTP_EMAIL, // Set the sender's email address
        },
        to,
        subject,
        html: (subject === 'Verification Email') ? verificationEmail(recipientName, otp) : passRecoverEmail(recipientName, otp),
      };

      // Send the email
      transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  },
  async sendWelcomeEmail(to, subject, recipientName) {
    try {
      // Create a Nodemailer transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.REPLY_EMAIL,
          pass: process.env.REPLY_PASSWORD,
        },
      });

      // Define email data
      const mailOptions = {
        from: {
          name: 'DIU Question Bank', // Set the sender's name here
          address: process.env.OTP_EMAIL, // Set the sender's email address
        },
        to,
        subject,
        html: welcomeEmail(recipientName),
      };

      // Send the email
      transporter.sendMail(mailOptions);
    } catch (error) {
      throw error;
    }
  },



};
