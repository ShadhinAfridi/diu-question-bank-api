const { createPool } = require("mysql");

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.DB_PORT
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to the database.');
  
    // Perform database operations
    // ...
  
    // Release the connection back to the pool
    connection.release();
  });
  
  // Close the connection pool when the application exits
  process.on('SIGINT', () => {
    pool.end();
    process.exit();
  });
 
module.exports = pool;