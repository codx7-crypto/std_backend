const pool = require('../config/db');

// ✅ جلب جميع التخصصات مع التصنيفات
const getAllMajors = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, category, major_image FROM majors');
    const majors = result.rows;

    // استخراج التصنيفات الفريدة
    const categories = [...new Set(majors.map(m => m.category))];
    
    res.json({ categories, majorsData: majors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ جلب تخصص واحد حسب الـ ID
const getMajorById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM majors WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllMajors, getMajorById };
