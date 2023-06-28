const {Router} = require('express');
const controller = require('../controller/author');

const router = Router();

router.get("/authors", controller.getAuthors);
router.post("/authors", controller.addAuthors);
router.get("/authors/:author_id", controller.getAuthorById);
router.put("/authors/:author_id", controller.updateAuthorById);
router.delete("/authors/:author_id", controller.deleteAuthorById);

module.exports = router;