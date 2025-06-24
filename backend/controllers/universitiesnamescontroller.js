// backend/controllers/universitiesController.js
const pool = require('../config/db');

// GET all universities + unique locations
const getUniversityNames = async (req, res) => {
    try {
      const result = await pool.query('SELECT id, name, location FROM universities');
      const universities = result.rows;
  
      // Extract unique locations
      const locations = [...new Set(universities.map(u => u.location))];
  
      res.json({ universities });
    } catch (error) {
      console.error('Error fetching universities:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  getUniversityNames
};
