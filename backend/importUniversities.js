const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const csv = require('csv-parser');
require('dotenv').config();

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false,
  }
});

// Update script
const updateMajors = async () => {
  const filePath = path.join(__dirname, 'updateddata.csv');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const updates = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const query = `
          UPDATE majors SET
            universities = $1,
            work_fields = $2,
            advantages = $3
          WHERE name = $4
        `;
        const values = [
          row['universities'] || null,
          row['workFields'] || null,
          row['advantages'] || null,
          row['name']
        ];
        updates.push(client.query(query, values));
      })
      .on('end', async () => {
        await Promise.all(updates);
        await client.query('COMMIT');
        console.log("✅ majors table updated successfully.");
        client.release();
        process.exit(0);
      });

  } catch (err) {
    await client.query('ROLLBACK');
    client.release();
    console.error("❌ Error updating majors:", err);
  }
};

updateMajors();
