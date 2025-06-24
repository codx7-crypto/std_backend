const pool = require('../config/db'); // your PostgreSQL pool

// GET /api/blogs
const getImportantBlogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs WHERE important = true');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getImportantBlogs };
