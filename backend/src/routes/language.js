const {Router} = require('express');
const controller = require('../controller/language');

const router = Router();

router.get("/languages", controller.getLanguages);
router.post("/languages", controller.addLanguages);
router.get("/languages/:language_id", controller.getLanguageById);
router.put("/languages/:language_id", controller.updateLanguageById);
router.delete("/languages/:language_id", controller.deleteLanguageById);

module.exports = router;