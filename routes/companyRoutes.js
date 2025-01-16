// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/create',authMiddleware.authenticateToken,companyController.createCompany);
router.get('/list',authMiddleware.authenticateToken, companyController.getCompanyList);
router.put('/:id',authMiddleware.authenticateToken, companyController.updateCompany);
router.get('/:id',authMiddleware.authenticateToken, companyController.getCompanyById);
router.delete('/:id',authMiddleware.authenticateToken, companyController.deleteCompany);

module.exports = router;
