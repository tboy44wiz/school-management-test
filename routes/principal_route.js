const express = require('express');
const principalController = require('../controllers/principal_controller');

//  Set Up Express Router
const router = express.Router();


//  GET All Principal
router.get("/", principalController.getAllPrincipal);

//  Get Logged in Principal
router.get("/principalLogin", principalController.getPrincipalLogin);

//  GET Individual Principal
router.get("/:individualID", principalController.getIndividualPrincipal);

//  ADD Principal
router.post("/", principalController.addIndividualPrincipal);

//  UPDATE Principal
router.put("/:individualID", principalController.updateIndividualPrincipal);

//  DELETE Principal
router.delete("/:individualID", principalController.deleteIndividualPrincipal);


module.exports = router;