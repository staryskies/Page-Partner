const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post('/:id/comments', bookController.addComment);

module.exports = router;