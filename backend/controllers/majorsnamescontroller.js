// backend/controllers/universitiesController.js
const pool = require('../config/db');

// GET all universities + unique locations
const getMajorsNames = async (req, res) => {
    try {
      const result = await pool.query('SELECT id, name, category FROM majors');
      const majors = result.rows;
  
      // Extract unique locations
      const categories = [...new Set(majors.map(u => u.category))];
  
      res.json({ majors });
    } catch (error) {
      console.error('Error fetching majors:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  getMajorsNames
};
