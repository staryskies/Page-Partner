const Book = require('./Book');
const Author = require('./Author');
const Chapter = require('./Chapter');
const Friendship = require('./Friendship');
const User = require('./User');
const Comment = require('./Comment');

Book.belongsTo(Author, { foreignKey: 'authorId' });
Author.hasMany(Book, { foreignKey: 'authorId' });
Chapter.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(Chapter, { foreignKey: 'bookId' });
Comment.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(Comment, { foreignKey: 'bookId' });
Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

module.exports = { Book, Author, Chapter, Friendship, User, Comment };