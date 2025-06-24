// backend/controllers/universitiesController.js
const pool = require('../config/db');

// API: /api/universities/search
const getUniversities = async (req, res) => {
    const { major, language, degree } = req.query;
  
    try {
      const query = `
        SELECT id, name, location, logo, coverimage, important FROM universities 
        WHERE $1 = '' OR majors ILIKE '%' || $1 || '%'
      `;
  
      const { rows } = await pool.query(query, [major]);
      res.json(rows);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: 'Search failed' });
    }
  };

module.exports = {
getUniversities
};
  