const News = require('../models/newsModel');

// 🟢 Helper: Format API output to match frontend expectations
const formatNews = (news) => {
  return {
    id: news.id,
    title: news.title,
    summary: news.summary,
    content: news.content, // Added content field
    image: news.image_url,
    date: news.created_at,
    source: news.source || "", // Added source field
    tags: news.tags || [], // Added tags field
    link: news.link || ""
  };
};

// ✅ Get all active news
const getAllNews = async (req, res) => {
  try {
    const newsList = await News.getAllNews();
    const formatted = newsList.map(formatNews);
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error in getAllNews:', error);
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// ✅ Get news by ID
const getNewsById = async (req, res) => {
  try {
    const news = await News.getNewsById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    const formatted = formatNews(news);
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error in getNewsById:', error);
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// ✅ Create new news item
const createNews = async (req, res) => {
  try {
    const { title, summary, content, image_url, source, tags } = req.body;
    const newNews = await News.createNews({
      title,
      summary,
      content,
      image_url,
      source,
      tags,
      created_at: new Date()
    });
    const formatted = formatNews(newNews);
    res.status(201).json(formatted);
  } catch (error) {
    console.error('Error in createNews:', error);
    res.status(400).json({ message: 'Error creating news', error: error.message });
  }
};

// ✅ Update news item
const updateNews = async (req, res) => {
  try {
    const { title, summary, content, image_url, source, tags } = req.body;
    const updated = await News.updateNews(req.params.id, {
      title,
      summary,
      content,
      image_url,
      source,
      tags,
      updated_at: new Date()
    });
    if (!updated) {
      return res.status(404).json({ message: 'News not found' });
    }
    const formatted = formatNews(updated);
    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error in updateNews:', error);
    res.status(400).json({ message: 'Error updating news', error: error.message });
  }
};

// ✅ Delete news item (soft delete)
const deleteNews = async (req, res) => {
  try {
    const deleted = await News.deleteNews(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error in deleteNews:', error);
    res.status(400).json({ message: 'Error deleting news', error: error.message });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  deleteNews,
  updateNews
};