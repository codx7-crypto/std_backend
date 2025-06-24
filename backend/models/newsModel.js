const db = require('../config/db');


const createNewsTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      );
    `);
    console.log('News table created or already exists');
  } catch (error) {
    console.error('Error creating news table:', error);
  }
};

// Initialize the table
//createNewsTable();

module.exports = {
  // Get all active news
  getAllNews: async () => {
    const query = `
      SELECT id, title, summary, image_url, created_at 
      FROM news 
      WHERE is_active = true 
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    return result.rows;
  },



  getNewsById: async (id) => {
    const query = `
      SELECT *
      FROM news 
      WHERE id = $1 AND is_active = true
    `;
    const result = await db.query(query, [id]);
    return result.rows[0]; // Return single news item instead of array
  },
  // Create new news
  createNews: async (newsData) => {
    const { title, content, image_url } = newsData;
    const query = `
      INSERT INTO news (title, summary, image_url)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [title, content, image_url];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Update news
  updateNews: async (id, newsData) => {
    const { title, content, image_url } = newsData;
    const query = `
      UPDATE news 
      SET title = $1, content = $2, image_url = $3
      WHERE id = $4 AND is_active = true
      RETURNING *
    `;
    const values = [title, content, image_url, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Soft delete news
  deleteNews: async (id) => {
    const query = `
      UPDATE news 
      SET is_active = false
      WHERE id = $1
      RETURNING id
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}; 