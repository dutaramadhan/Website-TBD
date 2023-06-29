const {Router} = require('express');
const controller = require('../controller/address');

const router = Router();

router.get("/address", controller.getAddress);
router.post("/address", controller.addAddress);
router.get("/address/:address_id", controller.getAddressById);
router.put("/address/:address_id", controller.updateAddressById);
router.delete("/address/:address_id", controller.deleteAddressById);

module.exports = router;