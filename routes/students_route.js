const express = require('express');
const studentController = require('../controllers/students_controller');


//  Set Up Express Router
const router = express.Router();

//  GET All Student
router.get("/", studentController.getAllStudents);

//  Get Student Classes
router.get("/studentClasses", studentController.getStudentClasses);

//  GET Individual Student
router.get("/:individualID", studentController.getIndividualStudent);

//  ADD Individual Student
router.post("/", studentController.addIndividualStudent);

//  UPDATE Individual Student
router.put("/:individualID", studentController.updateIndividualStudent);

//  DELETE Individual Student
router.delete("/:individualID", studentController.deleteIndividualStudent);


module.exports = router;

