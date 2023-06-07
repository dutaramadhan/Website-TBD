const {Router} = require('express');
const controller = require('../controller/book');

const router = Router();

router.get("/books", controller.getBooks);
router.post("/books", controller.addBooks);
router.get("/books/:book_id", controller.getBookById);
router.put("/books/:book_id", controller.updateBookById);
router.delete("/books/:book_id", controller.deleteBookById);

module.exports = router;