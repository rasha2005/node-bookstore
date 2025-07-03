const express = require('express');
const {addBook , deleteBookById , getAllBooks , getBookById , updateBookById , filterBookByGenre} = require('../controller/bookController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authenticateToken);

router.get('/book' , getAllBooks);

router.get('/book/search', filterBookByGenre);

router.get('/book/:id' , getBookById);

router.post('/book' , addBook);

router.put('/book/:id' , updateBookById);

router.delete('/book/:id' , deleteBookById);


module.exports = router;

