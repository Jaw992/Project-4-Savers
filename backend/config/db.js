require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

  pool.connect((error) => {
    if (error) {
      console.error("Connection error", err.stack);
    } else {
      console.log("Connected to PostgreSQL");
    }
  });

  module.exports = pool;