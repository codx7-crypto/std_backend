// backend/controllers/universitiesController.js
const pool = require('../config/db');

// GET all universities + unique locations
const getAllUniversities = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, location, logo, coverimage, important FROM universities');
    const universities = result.rows;

    // Extract unique locations
    const locations = [...new Set(universities.map(u => u.location))];

    res.json({ locations, universities });
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET university by ID
const getUniversityById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM universities WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'University not found' });
    }
  } catch (error) {
    console.error('Error fetching university by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAllUniversities,
  getUniversityById
};
