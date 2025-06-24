const pool = require('../config/db'); // your PostgreSQL pool

// GET /api/blogs
const getAllBlogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /api/blogs/:id
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Blog not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching blog:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAllBlogs, getBlogById };
