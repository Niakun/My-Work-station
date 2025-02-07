const mysql = require("mysql");
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

// Open the MySQL connection
connection.connect(error => {
  if (error) {
    console.error("Error connecting to the database:", error.stack);
    return;
  }
  console.log("Successfully connected to the database.");
});

// Gracefully handle the connection end
process.on('SIGINT', () => {
  connection.end(err => {
    if (err) {
      console.error("Error while closing the connection:", err.stack);
    } else {
      console.log("Database connection closed.");
    }
    process.exit();
  });
});

module.exports = connection;
