// backend/config/db.js
require('dotenv').config(); // Load environment variables
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Render PostgreSQL
  }
});

module.exports = pool;
