const {Router} = require('express');
const controller = require('../controller/category');

const router = Router();

router.get("/categories", controller.getCategories);
router.post("/categories", controller.addCategories);
router.get("/categories/:category_id", controller.getCategoryById);
router.put("/categories/:category_id", controller.updateCategoryById);
router.delete("/categories/:category_id", controller.deleteCategoryById);

module.exports = router;