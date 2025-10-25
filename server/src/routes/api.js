const express = require('express');
const router = express.Router();
const { auth, staffOnly } = require('../middleware/auth');
const authController = require('../controllers/authController');
const markController = require('../controllers/markController');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Marks routes
router.get('/marks', auth, markController.getStudentMarks);
router.post('/marks', [auth, staffOnly], markController.updateMarks);

module.exports = router;