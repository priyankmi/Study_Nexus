const TestSeries = require('../models/TestSeries');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');


// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Middleware to handle file uploads
  const uploadMiddleware = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
  ]);

exports.createTestSeries = (req, res) => {
    upload.single('thumbnail')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { title, description, price, tests, category} = req.body;
        const createdBy = req.user.id; // Assuming req.user.id contains the ID of the creator
            parsedTests = JSON.parse(tests);
        

        
        try {
            const newTestSeries = new TestSeries({
                title,
                description,
                price,
                createdBy, // Convert createdBy to ObjectId
                tests:parsedTests, // Convert tests array to ObjectId array
                category,
                thumbnail: req.file ? `/uploads/${req.file.filename}` : null // Save the thumbnail path if provided
            });

            await newTestSeries.save();
            res.status(201).json(newTestSeries);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
};



exports.getTestSeriesById = async (req, res) => {
    try {
        const testSeries = await TestSeries.findById(req.params.testSeriesId);
        if (!testSeries) {
            return res.status(404).json({ msg: 'Test series not found' });
        }
        res.json(testSeries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteTestSeries = async (req, res) => {
    try {
        let testSeries = await TestSeries.findById(req.params.testSeriesId);
        if (!testSeries) {
            return res.status(404).json({ msg: 'Test series not found' });
        }

        await TestSeries.findByIdAndRemove(req.params.testSeriesId);
        res.json({ msg: 'Test series removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllTestSeriesByUser = async (req, res) => {
    try {
        const testSeries = await TestSeries.find({ createdBy: req.user.id });
        res.json(testSeries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllTestSeries = async (req, res) => {
    try {
        const testSeries = await TestSeries.find().populate('createdBy', 'firstName lastName'); // Populate createdBy with name field from User
        res.json(testSeries);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
