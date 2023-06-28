const {Router} = require('express');
const controller = require('../controller/publisher');

const router = Router();

router.get("/publishers", controller.getPublishers);
router.post("/publishers", controller.addPublishers);
router.get("/publishers/:publisher_id", controller.getPublisherById);
router.put("/publishers/:publisher_id", controller.updatePublisherById);
router.delete("/publishers/:publisher_id", controller.deletePublisherById);

module.exports = router;