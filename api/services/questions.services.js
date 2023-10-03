const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO questions (questionId, code, courseName, lt, departmentName, shift, exam, semester, year, uploaderId, date, isApproved, link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                data.questionId,
                data.code,
                data.courseName,
                data.lt,
                data.departmentName,
                data.shift,
                data.exam,
                data.semester,
                data.year,
                data.uploaderId,
                data.date,
                data.isApproved,
                data.link
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getQuestionById: (id, callBack) => {
        pool.query(
            'SELECT * FROM questions WHERE questionId = ?',
            [id],
            (err, res, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, res[0]);
            }
        );
    },
    getQuestionByApprove: (approved, offset, limit, callBack) => {
        pool.query(
            'SELECT COUNT(*) as totalCount FROM questions WHERE isApproved = ?',
            [approved],
            (countErr, countResult) => {
                if (countErr) {
                    return callBack(countErr);
                }

                const totalCount = countResult[0].totalCount;

                // Step 2: Fetch paginated data
                pool.query(
                    'SELECT * FROM questions WHERE isApproved = ? LIMIT ?, ?',
                    [approved, offset, limit],
                    (err, res, fields) => {
                        if (err) {
                            return callBack(err);
                        }

                        // Step 3: Return both total count and paginated data
                        return callBack(null, { totalCount, data: res });
                    }
                );
            }
        );
    },

    getQuestions: (offset, limit, callBack) => {
        // Step 1: Execute the count query
        pool.query(
            'SELECT COUNT(*) as totalCount FROM questions',
            (countErr, countResult) => {
                if (countErr) {
                    return callBack(countErr);
                }

                const totalCount = countResult[0].totalCount;

                // Step 2: Fetch paginated data
                pool.query(
                    'SELECT * FROM questions LIMIT ?, ?',
                    [offset, limit],
                    (err, res, fields) => {
                        if (err) {
                            return callBack(err);
                        }

                        // Step 3: Return both total count and paginated data
                        return callBack(null, { totalCount, data: res });
                    }
                );
            }
        );
    },

    updateQuestion: (data, callBack) => {
        pool.query(
            'UPDATE questions SET code=?, courseName=?, lt=?, departmentName=?, shift=?, exam=?, semester=?, year=?, uploaderId=?, date=?, isApproved=?, link=? WHERE questionId=?',
            [
                data.code,
                data.courseName,
                data.lt,
                data.departmentName,
                data.shift,
                data.exam,
                data.semester,
                data.year,
                data.uploaderId,
                data.date,
                data.isApproved,
                data.link,
                data.questionId,
            ],
            (err, res) => {
                if (err) {
                    console.error('Error updating question:', err);
                    return callBack(err, null); // Pass the error to the callback
                }

                console.log('Question updated successfully');
                return callBack(null, 'Question updated successfully'); // Return a success message
            }
        );
    },



    deleteQuestion: (data, callBack) => {
        pool.query(
            'DELETE FROM questions WHERE questionId = ?',
            [data.id],
            (err, res, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, res[0]);
            }
        );
    },

    getQuestionsByDepartment: (department, offset, limit, callBack) => {
        pool.query(
            'SELECT * FROM questions WHERE departmentName = ? AND isApproved = 1 AND courseName ="" ORDER BY code ASC LIMIT ?, ? ',
            [department, offset, limit],
            (err, res, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, res);
            }
        );
    },

    getQuestionsByCourseName: (department, shift, exam, name, isApproved, offset, limit, callBack) => {
        pool.query(
            'SELECT * FROM questions WHERE departmentName = ? AND shift = ? AND exam = ? AND courseName = ? AND isApproved = ? LIMIT ?, ?',
            [department, shift, exam, name, isApproved, offset, limit],
            (err, res, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, res);
            }
        );
    },

    getQuestionCountByName: (department, shift, exam, name, isApproved, callBack) => {
        pool.query(
            'SELECT COUNT(*) as count FROM questions WHERE departmentName = ? AND shift = ? AND exam = ? AND courseName = ? AND isApproved = ?',
            [department, shift, exam, name, isApproved],
            (err, res, fields) => {
                if (err) {
                    return callBack(err);
                }

                const count = res[0].count; // Extract the count value from the result

                return callBack(null, count);
            }
        );
    },

    getQuestionCountByDepartment: (department, isApproved, callBack) => {
        pool.query(
            'SELECT COUNT(*) as count FROM questions WHERE departmentName = ? AND isApproved = ?',
            [department, isApproved],
            (err, res, fields) => {
                if (err) {
                    return callBack(err);
                }

                const count = res[0].count; // Extract the count value from the result

                return callBack(null, count);
            }
        );
    },

    getQuestionsByUser: (id, offset, limit, callBack) => {
        pool.query(
            'SELECT * FROM questions WHERE uploaderId = ? LIMIT ?, ?',
            [id, offset, limit],
            (err, res, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, res);
            }
        );
    },

    performQuestionQuery: (searchKey, searchValue, offset, limit, callBack) => {
        // Create a second query to get the total count of records
        const countQuery = 'SELECT COUNT(*) AS total FROM questions WHERE ?? LIKE ?';
      
        const partialSearchValue = `%${searchValue}%`; // Add wildcard % for partial matching
      
        pool.query(countQuery, [searchKey, partialSearchValue], (countErr, countResult) => {
          if (countErr) {
            return callBack(countErr);
          }
      
          const total = countResult[0].total; // Extract the total count
      
          // Now, execute the original query to get the paginated results with partial matching
          pool.query(
            'SELECT * FROM questions WHERE ?? LIKE ? LIMIT ?, ?',
            [searchKey, partialSearchValue, offset, limit],
            (err, res, fields) => {
              if (err) {
                return callBack(err);
              }
      
              return callBack(null, { data: res, totalCount: total });
            }
          );
        });
      },
      

}; 