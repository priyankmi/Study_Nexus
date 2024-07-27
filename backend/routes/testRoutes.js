const express = require('express');
const router = express.Router();
const { authenticateUser, isStudent, isInstructor } = require('../config/authMiddleware');
const testController = require('../controllers/testController');

// Create a test
router.post('/create', authenticateUser, isInstructor, testController.createTest);

//Update a test date
router.put('/update-dates/:testId', authenticateUser, isInstructor, testController.updateTestDates);



// Get a test by ID
router.get('/:id', authenticateUser, testController.getTestById);

// Get all tests created by a user
router.get('/', authenticateUser,isInstructor, testController.getAllTestsCreatedByUser);

// Delete a test
router.delete('/delete/:testId', authenticateUser, isInstructor, testController.deleteTest);

// Start a test
router.post('/:testId/start', authenticateUser, testController.startTest);

// Submit a test
router.put('/:testId/submit', authenticateUser, testController.submitTest);

//Get test result
router.get('/:testId/result', authenticateUser, testController.getTestResult);

router.get('/:testId/leaderboard', authenticateUser, testController.getLeaderboard);



module.exports = router;
