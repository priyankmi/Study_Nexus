const express = require('express');
const router = express.Router();
const { authenticateUser, isInstructor } = require('../config/authMiddleware');
const testSeriesController = require('../controllers/testSeriesController');

// Create a test series
router.post('/create', authenticateUser, isInstructor, testSeriesController.createTestSeries);

// Get a test series by ID
router.get('/:testSeriesId', testSeriesController.getTestSeriesById);

// Delete a test series
router.delete('/delete/:testSeriesId', authenticateUser, isInstructor, testSeriesController.deleteTestSeries);

// Get all test series created by user
router.get('/getAll', authenticateUser, isInstructor, testSeriesController.getAllTestSeriesByUser);

router.get('/', authenticateUser, testSeriesController.getAllTestSeries);


module.exports = router;
