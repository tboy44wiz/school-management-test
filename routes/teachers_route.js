const express = require('express');
const teachersController = require('../controllers/teachers_controller');

//  Set Up Express Router
const router = express.Router();


//  GET All Teacher
router.get("/", teachersController.getAllTeachers);

//  GET Individual Teacher
router.get("/:individualID", teachersController.getIndividualTeacher);

//  ADD Individual Teacher
router.post("/", teachersController.addIndividualTeacher);

//  UPDATE Individual Teacher
router.put("/:individualID", teachersController.updateIndividualTeacher);

//  DELETE Individual Teacher
router.delete("/:individualID", teachersController.deleteIndividualTeacher);


module.exports = router;