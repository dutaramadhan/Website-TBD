const {Router} = require('express');
const controller = require('../controller/staff');

const router = Router();

router.get("/staff", controller.getStaff);
router.post("/staff", controller.addStaff);
router.get("/staff/:staff_id", controller.getStaffById);
router.put("/staff/:staff_id", controller.updateStaffById);
router.delete("/staff/:staff_id", controller.deleteStaffById);

module.exports = router;