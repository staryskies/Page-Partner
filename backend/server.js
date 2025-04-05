const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/books');
const recommendationRoutes = require('./routes/recommendations');
const friendRoutes = require('./routes/friends');
const { sequelize, connectDB } = require('./config/database');
const { User } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/friends', friendRoutes);

// Simple authentication endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) { // In production, hash passwords!
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ token: user.id, name: user.name }); // Simple token as user ID
});

// Profile endpoint (no middleware for simplicity)
app.get('/profile', async (req, res) => {
  const userId = req.query.userId; // Pass userId as query param
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    name: user.name,
    booksRead: user.booksRead || 5,
    badges: user.badges ? user.badges.split(',') : ['New Genre', '10 Books'],
  });
});

connectDB().then(() => {
  sequelize.sync({ force: true }).then(async () => { // force: true for dev to reset DB
    // Seed some data
    await User.create({ email: 'test@example.com', password: 'password', name: 'Test User', booksRead: 5, badges: 'New Genre,10 Books' });
    console.log('Server running on port', process.env.PORT || 3000);
    app.listen(process.env.PORT || 3000);
  });
});

module.exports = app;