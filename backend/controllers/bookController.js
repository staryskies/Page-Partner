const { Book, Author, Chapter, Comment, User } = require('../models');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ include: [Author] });
    res.json(books.map(b => ({
      id: b.id,
      title: b.title,
      author: b.Author.name,
      description: b.description,
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        Author,
        { model: Chapter, limit: 1 },
        { model: Comment, include: [User] }
      ]
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({
      id: book.id,
      title: book.title,
      author: book.Author.name,
      description: book.description,
      content: book.Chapters[0]?.content || 'Sample chapter content goes here...',
      comments: book.Comments.map(c => ({
        id: c.id,
        text: c.text,
        userInitial: c.User.name[0].toUpperCase(),
        timestamp: c.timestamp,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

exports.addComment = async (req, res) => {
  const { bookId, text } = req.body;
  const userId = req.query.userId; // Passed from frontend
  try {
    const comment = await Comment.create({ bookId, userId, text });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};