const express = require('express');
const staffController = require('../controllers/staff_controller');

//  Set Up Express Router
const router = express.Router();


//  GET All Staff
router.get("/", staffController.getAllStaff);

//  Get Logged in Student
router.get("/staffLogin", staffController.getStaffLogin);

//  GET Individual Staff
router.get("/:individualID", staffController.getIndividualStaff);

//  ADD Individual Staff
router.post("/", staffController.addIndividualStaff);

//  UPDATE Individual Staff
router.put("/:individualID", staffController.updateIndividualStaff);

//  DELETE Individual Staff
router.delete("/:individualID", staffController.deleteIndividualStaff);


module.exports = router;