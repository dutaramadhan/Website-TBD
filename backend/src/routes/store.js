const {Router} = require('express');
const controller = require('../controller/store');

const router = Router();

router.get("/stores", controller.getStores);
router.post("/stores", controller.addStores);
router.get("/stores/:store_id", controller.getStoreById);
router.put("/stores/:store_id", controller.updateStoreById);
router.delete("/stores/:store_id", controller.deleteStoreById);

module.exports = router;