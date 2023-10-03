const pool = require("../config/database");
const admin = require('firebase-admin');


module.exports = {
  getUserById: (id, callBack) => {
    admin
      .auth()
      .getUser(id)
      .then((userRecord) => {
        // Handle the success case and pass the user record to the callback
        callBack(null, userRecord);
      })
      .catch((error) => {
        // Handle the error case and pass the error to the callback
        callBack(error, null);
      });
  },

  updateUserPassword: (email, newPassword, callback) => {
    admin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        const uid = userRecord.uid;
        admin.auth().updateUser(uid, {
          password: newPassword,
        })
          .then((userRecord) => {
            // Handle the success case and pass the user record to the callback
            callback(null, userRecord);
          })
          .catch((error) => {
            // Handle the error case and pass the error to the callback
            callback(error);
          });
      })
      .catch((error) => {
        // Handle the error case and pass the error to the callback
        callback(error);
      });

  },

  checkUserIsAvailable: (email, callBack) => {
    admin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        // Handle the success case and pass the user record to the callback
        callBack(null, userRecord);
      })
      .catch((error) => {
        // Handle the error case and pass the error to the callback
        callBack(error, null);
      });
  },

  updateVerificationStatus: (uid, callBack) => {
    admin
      .auth()
      .updateUser(uid, {
        emailVerified: true
      })
      .then((userRecord) => {
        // Handle the success case and pass the user record to the callback
        callBack(null, userRecord);
      })
      .catch((error) => {
        // Handle the error case and pass the error to the callback
        callBack(error, null);
      });
  },

  createAboutInfo: (data, callBack) => {
    pool.query(
      'INSERT INTO users (id, department, about, image) VALUES (?, ?, ?, ?)',
      [
        data.id,
        data.department,
        data.about,
        data.image
      ],
      (error, results) => {  // Removed `fields` parameter as it's not needed for INSERT
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAboutInfo: (id, callBack) => {
    pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id],
      (err, res) => {
        if (err) {
          return callBack(err);
        }

        // Convert BLOB to base64-encoded string
        if (res[0] && res[0].image) {
          const imageBuffer = res[0].image; // Assuming 'image' is the column name
          const imageBase64 = imageBuffer.toString('base64');
          res[0].image = imageBase64;
        }

        // Additional queries to fetch counts
        pool.query(
          'SELECT COUNT(*) AS pendingCount FROM questions WHERE uploaderId = ? AND isApproved = 0',
          [id],
          (err, pendingRes) => {
            if (err) {
              return callBack(err);
            }

            pool.query(
              'SELECT COUNT(*) AS approvedCount FROM questions WHERE uploaderId = ? AND isApproved = 1',
              [id],
              (err, approvedRes) => {
                if (err) {
                  return callBack(err);
                }

                pool.query(
                  'SELECT COUNT(*) AS rejectedCount FROM questions WHERE uploaderId = ? AND isApproved = 2',
                  [id],
                  (err, rejectedRes) => {
                    if (err) {
                      return callBack(err);
                    }

                    const aboutInfo = {
                      ...res[0],
                      pendingCount: pendingRes[0].pendingCount,
                      approvedCount: approvedRes[0].approvedCount,
                      rejectedCount: rejectedRes[0].rejectedCount
                    };

                    return callBack(null, aboutInfo);
                  }
                );
              }
            );
          }
        );
      }
    );
  },

  updateAboutInfo: (data, callBack) => {
    pool.query(
      'UPDATE users SET about = ?, department = ? WHERE id = ?',
      [
        data.about,
        data.department,
        data.id
      ],
      (err, res) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, res); // Return relevant data or success message here
      }
    );
  },

  updateImage: (data, callBack) => {
    const imageBuffer = Buffer.from(data.image, 'base64');

    pool.query(
      'UPDATE users SET image = ? WHERE id = ?',
      [
        imageBuffer,
        data.id
      ],
      (err, res) => {
        if (err) {
          return callBack(err);
        }
        return callBack(null, res); // Return relevant data or success message here
      }
    );
  }

};