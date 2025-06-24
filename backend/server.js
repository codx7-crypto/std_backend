require('dotenv').config();
const express = require('express');
const cors = require('cors');
const majorsRoutes = require('./routes/majorsRoutes');
const universitiesRoutes = require('./routes/universitiesRoutes');
const newsRoutes = require('./routes/newsRoutes');
const blogsRoutes = require('./routes/blogsRoutes');
const universitiesnamesRoutes = require('./routes/universitiesnamesRoutes');
const majorsnamesRoutes = require('./routes/majorsnamesRoutes');
const importantBlogsRoutes = require('./routes/importantBlogsRoutes');
const searchuniversities = require('./routes/searchuniversitiesRoutes');


const app = express();
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());

// routes
app.use('/api/majors', majorsRoutes);
app.use('/api/universities', universitiesRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/universitiesnames', universitiesnamesRoutes);
app.use('/api/majorsnames', majorsnamesRoutes);
app.use('/api/importantBlogsRoutes', importantBlogsRoutes);
app.use('/api/searchuniversities', searchuniversities);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
