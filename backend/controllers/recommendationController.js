const { Book, Author } = require('../models');

exports.getRecommendations = async (req, res) => {
  try {
    const books = await Book.findAll({ include: [Author], limit: 3 });
    res.json(books.map(b => ({
      id: b.id,
      title: b.title,
      author: b.Author.name,
      description: b.description,
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};